# The Way Home

An illustrated fantasy scroll story by Froso Patsalou for A2 Scroll World.

## Website

Live website: https://frosopatsalou.github.io/scroll-world-dragon/

The public GitHub Pages deployment can be opened without signing in.

Dedicated GitHub repository: https://github.com/frosopatsalou/scroll-world-dragon

Public visibility and uploading the project were explicitly approved by Froso. This project is separate from the other assignments and contains genuine website-stage commits. No earlier video-stage commit history has been invented.

One full-screen world. Scroll down to move forward through the film; scroll up to move backward. Four chapter buttons navigate the story. “Journey again” returns to the beginning. Text sits over the artwork with a soft shadow behind it. “Reduce motion” uses four still scenes in the same full-screen stage. Reduced-motion visitors receive this mode automatically and can enable animation. There is no separate reading page.

## Run locally

From this project directory, run:

```sh
python -m http.server 8765
```

Open `http://localhost:8765`. No installation or build step is needed. Serve over HTTP; opening the HTML directly as a file will prevent the film's fetch-based loading.

## How it works

`dist/scroll-world.js` maps scroll progress to the 49-second film. A continuous animation loop eases the timeline toward the requested position in both directions. Only one seek runs at a time; a canvas keeps the last decoded frame visible until the next is ready. The film stays paused and silent. Four scenes and three connectors share one file to avoid source-switch flashes. The implementation adapts smoothed tracking, continuous animation, blob loading and touch priming from the assignment's [Scroll World skill](https://github.com/oso95/scroll-world/blob/main/skills/scroll-world/SKILL.md).

`dist/styles.css` supplies the fixed full-viewport stage, original typography and palette, text overlays and phone layout. The root `index.html` is the public entry; `dist/index.html` mirrors the same experience for the static preview package. Artwork covers the viewport, cropping landscape edges on tall screens. The opening phone crop favors the heroine and horse. Phone address-bar height changes preserve scroll distance. Without JavaScript the opening poster remains visible with an instruction to enable JavaScript.

The video is 1280×720 at 24fps with frequent keyframes. Loading the entire ~20 MB file before scrubbing improves seeking but makes the initial download larger. Reduced-motion visitors do not download the film unless they choose the motion experience.

## Process and checks

- [Research and plan](docs/research-and-plan.md): required reference and four other interactive stories, visual choices and technical plan.
- [Website checks](docs/verification.md): observed browser results and remaining checks.
- Magnific MCP and Seedance 2.5 were used for production. The final film has no audio track.
- Scene/connector workflow was tested before the remaining generation. Froso supplied the scenario and approved the artwork and 49-second edit.
- AI assisted production, editing and code. Froso remains responsible for the creative decisions and understanding the work.

No external services, analytics or paid generations run when visiting this website.
