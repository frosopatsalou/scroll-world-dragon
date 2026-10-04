# Website verification — 4 October 2026

## Full-screen revision

- JavaScript syntax check passed for `dist/scroll-world.js`.
- One full-screen stage; no separate reading article or redirect at the public entry.
- Desktop visual review: artwork covers the viewport, text overlays the film with a soft shadow, controls stay within the scene.
- Continuous forward-scroll samples: decoded times 1.667, 1.917, 2.000, 2.042, 2.083 and 2.125 seconds. Reverse-scroll samples: 0.458, 0.250, 0.167, 0.083, 0.042 seconds, settling at the beginning. The canvas retains completed frames while subsequent seeks decode.
- Phone viewport 390×844: stage covers the entire viewport, no horizontal overflow; opening crop shows heroine and horse. Motion loaded and scrolling advanced the painted frame to 1.500 seconds.
- Reduced-motion preference: still images appear in the same full-screen stage. Enabling animation works without navigating to another page.
- Browser warning/error log empty during the responsive check.
- Existing approved 49-second silent film retained.

Physical-phone testing, including Safari, and slow-network testing remain outstanding. Browser viewport simulation is not a physical-device test.

## Previous version checks (superseded layout)

- Local HTTP response: 200. JavaScript syntax check passed.
- Desktop interactive mode: approved film loaded, readyState 4, duration 49 seconds, paused.
- Chapter 3 navigation: actual video time 20.000277s.
- Forward scroll: 25.440092s; scrolling backward returned to 20.000277s.
- End key: progress 100 / 100, video time 48.958333s (last valid frame), “Journey again” visible.
- Replay control: returned to first chapter and 00 / 100.
- Reduced-motion setting was enabled in the test browser: still story appeared by default, with all four illustrated chapters. The motion experience worked after opting in.
- Phone viewport 390×844: no horizontal overflow; video uses `object-fit: contain`, preserving the complete landscape. Text is below the landscape on the tall screen.
- All text is HTML outside the video. Video is muted and contains no audio track.
- Visual inspection: desktop opening and phone layout reviewed; no page-level blank stage. Existing accepted video limitations remain in the approved media.

Hosted deployment succeeded on 4 October 2026 at https://the-way-home-dragon.thomas-more-0656.chatgpt.site. The ~20 MB web copy fits the host's individual-asset limit. The hosting preview currently has owner-only access.

The user explicitly approved public GitHub publication. Dedicated repository: https://github.com/frosopatsalou/scroll-world-dragon. The source, approved media and notes were pushed with their website-stage commit history. GitHub Pages build succeeded, and the public address https://frosopatsalou.github.io/scroll-world-dragon/ was opened without sign-in. The revised root entry now serves the story directly.

Still outstanding: a physical phone test (including Safari) and slower-network testing. The research record is honest about the entry-only reviews and its timing after video production.
