# Website verification — 4 October 2026

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

Still outstanding: a physical phone test (including Safari), slower-network testing and independently confirming access to the eventual live URL from the teacher's account. Hosted deployment status will be checked separately. Dedicated GitHub repository creation/push remains a separate submission requirement.
