'use strict';
// Uses the reference scroll-world skill's continuous rAF smoothing and blob seeking.
(() => {
  const $ = selector => document.querySelector(selector);
  const film = $('#film'), canvas = $('#world'), poster = $('#poster'), journey = $('#journey');
  const ctx = canvas.getContext('2d',{alpha:false});
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scriptBase = new URL('.',document.currentScript.src);
  const asset = name => new URL(`assets/${name}`,scriptBase).href;
  const chapters = [
    {time:0,name:'THE MEADOW',title:'The way<br><em>home.</em>',caption:'A rider. A dragon. A bond that brings her back.',image:'meadow'},
    {time:12,name:'ABOVE THE RIVER',title:'Trust takes flight.',caption:'One leap beyond the familiar.',image:'river'},
    {time:20,name:'INTO THE SHADOW',title:'Courage has a limit.',caption:'When her strength gives way, a friend returns.',image:'cave'},
    {time:39,name:'THE WAY HOME',title:'Some bonds<br>bring us back.',caption:'The sky opens again. Her horse is waiting.',image:'home'},
  ];
  const buttons = [...document.querySelectorAll('[data-time]')];
  let motion = !reduced.matches, ready = false, seeking = false, request = 0, current = 0, target = 0;
  let lastTick = 0, chapter = -1, blobURL, loadingPromise, height = innerHeight, width = 0;
  const end = () => (film.duration || 49)-1/24;
  const range = () => Math.max(1,journey.offsetHeight-height);
  function cover(image) {
    const w = image.videoWidth || image.naturalWidth, h = image.videoHeight || image.naturalHeight;
    if (!w || !h) return false;
    const scale = Math.max(canvas.width/w,canvas.height/h);
    const focus = innerWidth < 650 && current < 4 ? .5+.3*(1-current/4) : .5;
    ctx.drawImage(image,(canvas.width-w*scale)*focus,(canvas.height-h*scale)/2,w*scale,h*scale);
    return true;
  }
  function paint() {
    if (motion && ready && cover(film)) {
      poster.classList.add('painted'); canvas.dataset.time = film.currentTime.toFixed(3);
    }
  }
  function schedule() { if (!request) request = requestAnimationFrame(tick); }
  function size() {
    // Keep scroll distance stable when the phone's address bar changes height.
    if (innerWidth !== width) { width = innerWidth; height = innerHeight; journey.style.height = `${height*24}px`; }
    const dpr = Math.min(devicePixelRatio || 1,1.5);
    canvas.width = Math.round(innerWidth*dpr); canvas.height = Math.round(innerHeight*dpr);
    if (motion && ready) paint(); else cover(poster);
    schedule();
  }
  function showCopy(time) {
    const index = chapters.reduce((c,item,i) => time >= item.time ? i : c,0);
    if (index !== chapter) {
      chapter = index; const c = chapters[index];
      $('#eyebrow').textContent = `0${index+1} / ${c.name}`;
      $('#headline').innerHTML = c.title; $('#headline').classList.toggle('chapter-heading',index !== 0);
      $('#caption').textContent = c.caption; $('#chapter-name').textContent = c.name;
      buttons.forEach((button,i) => i === index ? button.setAttribute('aria-current','step') : button.removeAttribute('aria-current'));
      if (!motion) poster.src = asset(`${c.image}.jpg`);
    }
    $('#progress-bar').style.width = `${time/end()*100}%`;
    $('#progress-label').textContent = `${String(Math.round(time/end()*100)).padStart(2,'0')} / 100`;
    $('#scroll-cue').hidden = time > 2; $('#restart').hidden = time < 46;
    const visible = !motion || time < 5 || (time >= 12 && time < 15) || (time >= 20 && time < 23) || time >= 44;
    $('#story-copy').style.opacity = visible ? 1 : 0;
    $('#story-copy').style.pointerEvents = visible ? 'auto' : 'none';
  }
  function tick(now) {
    request = 0; target = Math.min(1,Math.max(0,scrollY/range()))*end();
    const dt = lastTick ? Math.min((now-lastTick)/1000,.05) : 1/60; lastTick = now;
    current = motion ? current+(target-current)*(1-Math.exp(-dt/.16)) : target;
    if (Math.abs(target-current) < .003) current = target;
    showCopy(current);
    if (motion && ready && !seeking) {
      const time = Math.min(end(),Math.round(current*24)/24);
      if (Math.abs(film.currentTime-time) > 1/48) { seeking = true; film.currentTime = time; }
    }
    if (Math.abs(target-current) > .003 || (motion && ready && Math.abs(film.currentTime-current) > 1/24)) schedule();
  }
  film.addEventListener('seeked',() => { paint(); seeking = false; schedule(); });
  film.addEventListener('loadeddata',() => { ready = true; $('#loading').hidden = true; paint(); schedule(); });
  poster.addEventListener('load',() => { if (!ready || !motion) cover(poster); });
  async function loadFilm() {
    if (loadingPromise) return loadingPromise;
    $('#loading').hidden = false;
    loadingPromise = (async () => {
      try {
        const response = await fetch(asset('journey.mp4')); if (!response.ok) throw new Error('Film unavailable');
        const total = Number(response.headers.get('content-length')); let blob;
        if (response.body && total) {
          const reader = response.body.getReader(), chunks = []; let loaded = 0;
          while (true) {
            const {done,value} = await reader.read(); if (done) break;
            chunks.push(value); loaded += value.length;
            $('#loading-text').textContent = `Preparing your journey… ${Math.min(100,Math.round(loaded/total*100))}%`;
          }
          blob = new Blob(chunks,{type:'video/mp4'});
        } else blob = await response.blob();
        blobURL = URL.createObjectURL(blob); film.src = blobURL; film.load();
      } catch (error) {
        loadingPromise = undefined; setMotion(false);
        $('#loading').hidden = false; $('#loading-text').textContent = 'The film could not load. Scroll to explore the still scenes.';
      }
    })();
    return loadingPromise;
  }
  function setMotion(value) {
    motion = value; chapter = -1; lastTick = 0; poster.classList.remove('painted');
    $('#mode-toggle').textContent = motion ? 'Reduce motion' : 'Enable motion';
    $('#mode-toggle').setAttribute('aria-pressed',String(!motion));
    if (motion) { poster.src = asset('meadow.jpg'); if (!ready) loadFilm(); else paint(); }
    else { film.pause(); $('#loading').hidden = true; }
    schedule();
  }
  function jump(time) {
    window.scrollTo({top:(time ? Math.min(end(),time+.05) : 0)/end()*range(),behavior:'instant'}); schedule();
  }
  buttons.forEach(button => button.addEventListener('click',() => jump(Number(button.dataset.time))));
  $('#restart').addEventListener('click',() => jump(0));
  $('.wordmark').addEventListener('click',event => { event.preventDefault(); jump(0); });
  $('#mode-toggle').addEventListener('click',() => setMotion(!motion));
  reduced.addEventListener('change',event => setMotion(!event.matches));
  // Prime a paused, muted video on the first touch for iOS Safari.
  addEventListener('pointerdown',() => {
    if (!motion || !ready || !matchMedia('(pointer: coarse)').matches) return;
    const time = film.currentTime; film.play().then(() => { film.pause(); film.currentTime = time; }).catch(() => {});
  },{once:true});
  addEventListener('scroll',schedule,{passive:true}); addEventListener('resize',size,{passive:true});
  addEventListener('pagehide',event => { if (!event.persisted && blobURL) URL.revokeObjectURL(blobURL); });
  size(); setMotion(motion);
})();
