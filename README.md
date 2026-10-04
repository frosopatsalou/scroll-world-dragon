# The Way Home

An illustrated fantasy scroll story by Froso Patsalou for A2 Scroll World.

## Website

Live website: https://frosopatsalou.github.io/scroll-world-dragon/

Private working preview: https://the-way-home-dragon.thomas-more-0656.chatgpt.site

The public GitHub Pages deployment succeeded on 4 October 2026 and can be opened without signing in. The private working preview is a separate owner-only copy.

Dedicated GitHub repository: https://github.com/frosopatsalou/scroll-world-dragon

Public visibility and uploading the project were explicitly approved by Froso. This project is separate from the other assignments and contains genuine website-stage commits. No earlier video-stage commit history has been invented.

Scroll down to move forward through the film; scroll up to move backward. Four chapter buttons navigate the story. “Journey again” returns to the beginning. “Read without motion” switches to an illustrated text version. Reduced-motion visitors receive the still story automatically.

## Run locally

From this project directory, run:

```sh
python -m http.server 8765 --directory dist
```

Open `http://localhost:8765`. No installation or build step is needed. Serve over HTTP; opening the HTML directly as a file will prevent the film's fetch-based loading.

## How it works

`dist/story.js` divides scroll distance by the journey's available scroll range and maps the resulting 0–1 value to video time. The silent video is paused, and its `currentTime` changes with scroll position. Only one seek is active at a time. The latest position is applied when that seek finishes. Four scenes and three connectors are encoded into one 49-second film to avoid source-switch flashes.

`dist/styles.css` supplies the sticky stage, original typography and palette, text overlays and phone layout. `dist/index.html` holds the story, chapter controls and accessible still-image fallback. The whole landscape remains visible on phones.

The video is 1280×720 at 24fps with frequent keyframes. Loading the entire ~20 MB file before scrubbing improves seeking but makes the initial download larger. Reduced-motion visitors do not download the film unless they choose the motion experience.

## Process and checks

- [Research and plan](docs/research-and-plan.md): required reference and four other interactive stories, visual choices and technical plan.
- [Website checks](docs/verification.md): observed browser results and remaining checks.
- Magnific MCP and Seedance 2.5 were used for production. The final film has no audio track.
- Scene/connector workflow was tested before the remaining generation. Froso supplied the scenario and approved the artwork and 49-second edit.
- AI assisted production, editing and code. Froso remains responsible for the creative decisions and understanding the work.

No external services, analytics or paid generations run when visiting this website.
