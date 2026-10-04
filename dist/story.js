'use strict';
(() => {
  const video = document.querySelector('#film');
  const journey = document.querySelector('#journey');
  const toggle = document.querySelector('#mode-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = [
    {time:0,name:'THE MEADOW',title:'The way<br><em>home.</em>',caption:'A rider. A dragon. A bond that brings her back.'},
    {time:12,name:'ABOVE THE RIVER',title:'Trust takes flight.',caption:'One leap beyond the familiar.'},
    {time:20,name:'INTO THE SHADOW',title:'Courage has a limit.',caption:'When her strength gives way, a friend returns.'},
    {time:39,name:'THE WAY HOME',title:'Some bonds<br>bring us back.',caption:'The sky opens again. Her horse is waiting.'},
  ];
  const copy = document.querySelector('#story-copy');
  const cue = document.querySelector('#scroll-cue');
  const loading = document.querySelector('#loading');
  const restart = document.querySelector('#restart');
  let still = reduced.matches, ready = false, seeking = false, target = 0, frameRequest = 0, chapter = -1;
  let blobURL, loadingPromise;
  const lastTime = () => Math.max(0,(video.duration || 49)-1/24);
  const scrollRange = () => Math.max(1,journey.offsetHeight-innerHeight);
  function schedule() { if (!frameRequest) frameRequest = requestAnimationFrame(update); }
  function update() {
    frameRequest = 0;
    if (still) return;
    const progress = Math.min(1,Math.max(0,scrollY/scrollRange()));
    target = progress*lastTime();
    document.querySelector('#progress-bar').style.width = `${progress*100}%`;
    document.querySelector('#progress-label').textContent = `${String(Math.round(progress*100)).padStart(2,'0')} / 100`;
    const index = chapters.reduce((current,c,i) => target >= c.time ? i : current,0);
    if (index !== chapter) {
      chapter = index;
      const c = chapters[index];
      document.querySelector('#eyebrow').textContent = `0${index+1} / ${c.name}`;
      document.querySelector('#headline').innerHTML = c.title;
      document.querySelector('#headline').classList.toggle('chapter-heading',index !== 0);
      document.querySelector('#caption').textContent = c.caption;
      document.querySelector('#chapter-name').textContent = c.name;
      document.querySelectorAll('[data-time]').forEach((button,i) => {
        if (i === index) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current');
      });
    }
    // Give the flight and fight room to breathe; copy returns at chapter openings and the ending.
    copy.classList.toggle('quiet-copy',!(target < 3.2 || (target >= 12 && target < 14.2) ||
      (target >= 20 && target < 22) || (target >= 39 && target < 41) || target >= 46));
    cue.hidden = progress > .06;
    restart.hidden = progress < .96;
    if (ready && !seeking && Math.abs(video.currentTime-target) > 1/48) {
      seeking = true;
      video.currentTime = target;
    }
  }
  video.addEventListener('seeked',() => { seeking = false; schedule(); });
  video.addEventListener('loadeddata',() => { ready = true; loading.hidden = true; schedule(); });
  function fail() {
    ready = false;
    document.querySelector('#loading-text').textContent = 'The film could not load. Choose “Read without motion” to continue.';
    loading.hidden = false;
  }
  video.addEventListener('error',fail);
  async function loadFilm() {
    if (loadingPromise) return loadingPromise;
    loadingPromise = (async () => {
      try {
        const response = await fetch('assets/journey.mp4');
        if (!response.ok) throw new Error('Film unavailable');
        const total = Number(response.headers.get('content-length'));
        let blob;
        if (response.body && total) {
          const reader = response.body.getReader(); let loaded = 0; const chunks = [];
          while (true) {
            const {done,value} = await reader.read(); if (done) break;
            chunks.push(value); loaded += value.length;
            document.querySelector('#loading-text').textContent = `Preparing your journey… ${Math.min(100,Math.round(loaded/total*100))}%`;
          }
          blob = new Blob(chunks,{type:'video/mp4'});
        } else blob = await response.blob();
        blobURL = URL.createObjectURL(blob);
        video.src = blobURL;
        video.preload = 'auto'; video.load();
      } catch (error) { loadingPromise = undefined; fail(); }
    })();
    return loadingPromise;
  }
  function setMode(value) {
    still = value;
    document.body.classList.toggle('still-mode',still);
    toggle.textContent = still ? 'Explore with motion' : 'Read without motion';
    toggle.setAttribute('aria-pressed',String(still));
    window.scrollTo({top:0,behavior:'instant'});
    if (!still) { loading.hidden = ready; loadFilm(); schedule(); }
  }
  toggle.addEventListener('click',() => setMode(!still));
  reduced.addEventListener('change',event => setMode(event.matches));
  document.querySelector('.skip-link').addEventListener('click',() => setMode(true));
  document.querySelector('.wordmark').addEventListener('click',event => {
    event.preventDefault(); window.scrollTo({top:0,behavior:'instant'}); schedule();
  });
  restart.addEventListener('click',() => { window.scrollTo({top:0,behavior:'instant'}); schedule(); });
  document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click',() => {
    window.scrollTo({top:Number(button.dataset.time)/lastTime()*scrollRange(),behavior:'instant'}); schedule();
  }));
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('pagehide',event => { if (!event.persisted && blobURL) URL.revokeObjectURL(blobURL); });
  setMode(still);
})();
