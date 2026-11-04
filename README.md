# doodles

Small, silly, self-contained web toys. Each one is a folder with an
`index.html` and no build step.

Live at <https://levilindsey.github.io/doodles/>.

| Doodle | Live | What it does |
|---|---|---|
| [`nerd-hero/`](nerd-hero/) | [levi.dev/nerdhero](https://levi.dev/nerdhero/) | The n's stem shoots up and the d's stem shrinks into the o, so "nerd" becomes "hero". The blueprint background turns into a comic-book halftone. |

## nerd → hero

Click, tap or press Space to play it, and again to reverse it. Drag
sideways, or use the arrow keys, to scrub. M mutes the sound.

During the transformation:

- **The background** morphs from blueprint graph paper to a comic
  halftone. A shockwave sweeps out from the word. As it passes each grid
  intersection, the four grid arms there pull back into the point and a
  halftone dot grows in their place. A red sunburst fills the circle
  behind the wave.
- **The equations** scribbled on the blueprint are blown off the page as
  the wave reaches them.
- **The dimensioning marks** (guide lines, dimension arrows, "fig. 1")
  measure the stems as they move. The d's dimension reads `?!` just
  before its stem disappears.
- **The animation** has anticipation and follow-through: the word
  crouches and shivers, the d's stem lets go and snaps back into the
  middle of the o's side like a tape measure, and the word lands on
  "hero" with a white flash, screen shake, speed lines and a burst of
  stars. The letters get a comic look: outline, block extrusion, italic
  lean and a glint.
- **Sound** is synthesized with WebAudio: a slide whistle, a brass
  "ta-DAAA" with a boom, and a sad trombone when you turn the hero back
  into a nerd.
- The tab title, the theme and the hint text all switch with the word.

The timeline runs from 0 to 2.3 (impact at 0.72) and plays at a third of
real time, so the transition takes 6.9 s. `?t=<T>` freezes it at T, for
screenshots. `prefers-reduced-motion` turns off the shake, stars and
streaks.

`scripts/nerd-hero-shots.mjs` screenshots frozen points and a real-time
run with headless Chrome.

## License

MIT. See [LICENSE](LICENSE).
