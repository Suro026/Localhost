# Claude Design: Keystone launch poster

## Step 1: attach these files to the chat

| File | Where it goes |
|---|---|
| `macbook-landing.png` (or `macbook-tests.png`) | MacBook screen |
| `android-landing.png` | Left phone (Android) |
| `iphone-tests.png` | Right phone (iPhone) |
| `static/img/logo-full.svg` and `static/img/logo-mark.svg` | Logo (from the project folder) |

Use `macbook-tests.png` if you want a clean look. `macbook-landing.png` is more colourful, but its hero has decorative overlapping outline text.

## Step 2: paste this prompt

```
Design a launch poster for Keystone, a free GATE exam-practice website. Portrait 4:5 (1080 x 1350).
I attached real screenshots of my website and my logo. Use them exactly as given. Do not redraw or invent any screen content.

THE ONE IDEA: it is completely free, and I will never charge anything.

LAYOUT
- Centre and largest: a MacBook (front view) showing macbook-*.png on its screen.
- Left: an Android phone (punch-hole camera) showing android-landing.png.
- Right: an iPhone (Dynamic Island) showing iphone-tests.png.
- The two phones sit slightly lower than the laptop and are rotated about 20 degrees inward, so all three devices form a gentle curved arc, both sides curving toward the MacBook. The phones overlap the laptop edges a little. Soft realistic shadows.
- Across the lower third, two yellow crime-scene tapes crossing diagonally, edge to edge and a little past the poster edges, one tilted -6 degrees and one +5 degrees, slightly overlapping the bottom of the devices as if they seal the scene. Tape colour #FFD400, black bold condensed capital text (Anton or Bebas Neue), wide letter spacing, thin dark edges, subtle crease texture.
  Tape 1 text: FREE · FREE · FREE · FREE · FREE · FREE
  Tape 2 text: NO PAYMENT · NO CARD · NEVER CHARGED · NO PAYMENT · NO CARD · NEVER CHARGED
  The idea: like police tape around a crime scene, but it seals off the price. The paywall is shut for good.
- Top left: my logo. Top: headline "GATE practice. Completely free." with "Completely free" in cyan.
- Subline under the headline: "Official GATE papers as timed mock tests, with the official answer key."
- Bottom: "Start now: keystonee.vercel.app" and a small QR code to that address. A small WhatsApp icon with the text "Join our WhatsApp group".

BRAND (use only these, plus the tape yellow)
- Violet #6b26d9 (main background, fading to #5a1fb8 at the bottom)
- Cyan #0bb8da and pink #eb4799 as rounded folder-tab shapes behind the devices (the website uses folder-tab shapes)
- Lilac #e6dafb for soft panels, midnight #2a1163 for deep shadows
- WhatsApp green #1fa855 only on the WhatsApp icon
- Faint lilac palm-leaf pattern at 8% opacity on the background, like my landing page
- Font: Plus Jakarta Sans (headline ExtraBold 800, body Medium). URL in JetBrains Mono SemiBold.

RULES
- Do NOT say "AI", "guaranteed", "rank", or "selection".
- Yellow is used only for the tape.
- Headline at least 64 px and readable on a phone.
- Clean, high contrast, one memorable element: the tape.

Then make two more versions: 9:16 story (1080 x 1920, keep text away from the top 250 px and bottom 340 px) and 1.91:1 link post (1200 x 628, devices closer together).
```

## Step 3: if the first result is off, send one of these follow-ups

- "Rotate the phones more inward so it reads as a curve, and put the MacBook slightly in front of them."
- "Make the tapes bigger and put the second one behind the phones' bottom edge so it looks wrapped."
- "Replace the screens with the attached screenshots exactly, with no changes."
- "Remove the extra text. Keep only the headline, tapes, devices, URL and logo."
- "Use my exact brand colours from the list. The background should be violet, not blue."

## Facts you can use (all true today)

- 13 official GATE papers, 845 questions (CS 2018 to 2025, DA 2024 and 2025)
- Official answer keys, GATE marking scheme with negative marking, timed tests
- Scores, weak-topic report, study timer, a plan you write yourself
- Works on laptop and phone, installs like an app
- Completely free, no payment

## Captions

See `poster-brief.md`, section 9 (LinkedIn, Instagram, Facebook).
