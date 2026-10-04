# The Way Home: research and plan

Author: Froso Patsalou. Research recorded 4 October 2026. Submission deadline: 6 October 2026.

## Subject, audience and purpose

An illustrated fantasy journey about trust, danger and returning to a companion. The audience is visitors who enjoy visual fantasy stories. The central message is that courage includes accepting help. The scenario, character references, action and camera direction came from Froso; Codex assisted with production, editing, implementation and checks.

## Required reference

[oso95/scroll-world](https://github.com/oso95/scroll-world/tree/main) and its [scrub engine](https://github.com/oso95/scroll-world/blob/main/skills/scroll-world/references/scrub-engine.js): studied the scene/connector chain, boundary-frame rule, portable JavaScript approach, media loading and seeking. The project adapts these ideas to Magnific MCP and Seedance 2.5. Its page, story and engine implementation are original. The seven approved clips are joined into one silent timeline, so browser playback does not switch sources at scene boundaries. No Higgsfield or Monid calls are used.

## Four other interactive references

| Reference | Observation from the page / entry experience | Decision for this project |
| --- | --- | --- |
| [The Deep Sea — Neal Agarwal](https://neal.fun/deep-sea/) | A vertical ocean journey places labelled creatures and short facts along an ordered progression. | Give the visitor an understandable journey and visible progress; keep captions brief. |
| [The Boat — SBS](https://www.sbs.com.au/theboat/) | The entry screen uses illustrated rain, a handwritten start cue and an explicit audio/headphone notice. Entry screen reviewed; full story was not traversed. | Set a coherent illustrated mood and make the first action obvious. Our user chose silence, so this story must work without audio. |
| [How Music Taste Evolved — The Pudding](https://pudding.cool/2017/03/music-history/) | A strong headline, portraits, a selected year and an explicit play control introduce an interactive music history. Intro reviewed; audio was not played. | A clear title and visible controls explain the experience. Use chapter controls to revisit points in the story. |
| [AirPods Pro — Apple](https://www.apple.com/airpods-pro/) | The page groups large visual media with concise headings, galleries and feature sections. The inspected browser had reduced motion enabled and some media unavailable. | Separate HTML text from media, let visuals carry the story and provide a usable still-image alternative. |

The observations above distinguish direct inspection from inferred design choices. No reference artwork or copy is reused.

## Visual direction

- Illustrated fantasy; pale silver dragon, pink-haired adult heroine, hooded villain, cream horse.
- Palette: deep pine `#111c1b`, parchment `#f4eddc`, soft gold `#e4ce9e`, natural greens and sky blues supplied by the film.
- Lighting: open daylight, a darker cave confrontation, then daylight on the return.
- Materials: stone, cloth, metal, scales and meadow grass.
- Typography: Georgia display serif and Arial interface/body text. System fonts avoid extra font downloads.
- Camera: field reveal, dragon approach, side flight, cave landing, changing duel angles, escape orbit and return to the opening composition.
- Mood: calm, wonder, danger, relief. Identity: The Way Home.

## Technical plan and final timing

Plain HTML, CSS and JavaScript with no framework dependency. A fixed full-viewport stage maps normalized scroll position to the 49-second film. Forward scrolling increases time; backward scrolling decreases it. A continuous animation loop eases timeline changes in both directions. Requests are coalesced while a seek is in progress; a canvas holds the last decoded frame until `seeked` delivers the next. The film stays paused and silent.

| Segment | Timeline |
| --- | --- |
| Main scene 1: field and reveal | 0–8s |
| Connector 1: boarding | 8–12s |
| Main scene 2: river flight | 12–16s |
| Connector 2: cave landing | 16–20s |
| Main scene 3: duel and rescue | 20–33s |
| Connector 3: escape and longer flight | 33–39s |
| Main scene 4: return and reunion | 39–49s |

Video target: H.264, 1280×720, 24fps, 49 seconds, no audio track. Web encoding uses a keyframe every six frames and fast-start MP4 metadata to improve seeking. The complete ~20 MB film loads to a local browser blob before scrubbing; a poster and percentage indicator remain available during loading. This trades initial download time and memory for stable forward/backward seeks. The web copy uses CRF 26 to fit the host's 25 MiB individual-asset limit; the approved production master remains available separately.

The landscape covers the entire viewport, cropping edges on phones. No additional portrait generation was commissioned. The opening phone crop favors the heroine and horse. Reduced-motion visitors use still images in the same full-screen stage, with a control to enable animation. A loading error preserves that still experience. Without JavaScript the opening poster remains visible. The ending offers “Journey again”.

## Full-screen revision — 4 October 2026

Froso requested one immersive page, smoother scrolling in both directions and text over the film with a faint shadow. The separate reading layout was removed. The scroll distance was extended to give smaller timeline changes per wheel movement.

The user-supplied [Whiteout reference](https://whiteout.overvac.com/) was reviewed in a browser: full-viewport scenery, sparse fixed controls, text over the scene and camera movement driven by scrolling. These informed the presentation; the dragon story, artwork, palette and typography remain this project's own.

The assignment's [Scroll World skill](https://github.com/oso95/scroll-world/blob/main/skills/scroll-world/SKILL.md) and scrub engine were read. The custom engine adapts its continuous animation loop, smoothed tracking, coalesced seeks, full-file blob loading, first-touch video priming and stable mobile scroll-distance approach. Existing six-frame GOP media was retained; no additional generations or visual quality reduction were needed for this revision.

## Production evidence

Later website revision: Froso requested higher quality and continuous looping. The public GitHub Pages media was re-encoded from the approved master at CRF 18 (approximately 46 MB), retaining the native 1280×720 resolution. The final 0.75 seconds blend into the opening frame. The scroll engine uses an unwrapped logical timeline and a recentered native scroll buffer, so easing remains continuous through forward and reverse loop boundaries. The public deployment does not use the private preview's earlier 25 MiB asset constraint. The original production master is unchanged.

Magnific MCP generated the images and Seedance 2.5 clips. Actual video boundary frames were extracted for the connectors. A complete scene A → connector → scene B test was reviewed before generating the remaining clips. Final timing revisions shortened the first flight, lengthened the fight, made the villain recoil and extended the escape flight. The accepted master is `Dragon-49s-silent-revision-03.mp4`; its production logs remain in the parent workspace's `outputs/dragon` folder.

This research record was assembled after video approval; it does not claim that the full reference review preceded the original generations.
