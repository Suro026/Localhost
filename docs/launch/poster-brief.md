# Keystone launch poster: design brief

Use this brief in Canva, Figma, Photoshop, or paste the "Image-generator prompt" section into an AI image tool.
Launch: today, 12:00. Post on LinkedIn, Instagram, Facebook, WhatsApp, X.

## 1. What the poster must say (one idea)

**Keystone is a free GATE mock-test platform. Completely free. Never charged.**

Everything else on the poster supports that one idea.

| Item | Text |
|---|---|
| Headline | **GATE practice. Completely free.** |
| Subline | Official GATE papers as timed mock tests, with the official answer key. |
| Tape line 1 (yellow banner) | **FREE · FREE · FREE · FREE · FREE** |
| Tape line 2 (yellow banner) | **NO PAYMENT · NO CARD · NEVER CHARGED** |
| Call to action | **Start now: keystonee.vercel.app** |
| Small line | Join the WhatsApp group for updates. |

Facts you can print (all true today):
- 13 official GATE papers, 845 questions
- CS 2018 to 2025, DA 2024 and 2025
- Marking follows the GATE scheme (negative marking included)
- Timed tests, scores, weak-topic report, study timer, your own study plan
- Works on laptop and phone, installs like an app

Do **not** print: "AI-powered" (AI explanations are not released yet), rank or selection promises, "100% accurate", "guaranteed".

## 2. Layout (the one specific thing you asked for)

Three devices, all showing real screenshots of the website. The MacBook is in the middle and the biggest. A phone stands on each side, and **both sides curve inward toward the laptop** (like a wide curved arc). Left is Android, right is iPhone.

```
 ┌────────────────────────────────────────────────────────────┐
 │  KEYSTONE logo (top left)                  [ WhatsApp icon ]│
 │                                                            │
 │          GATE practice. Completely free.                   │
 │   Official papers · Official keys · Timed mock tests       │
 │                                                            │
 │   ╲ Android ╲        ┌────────────────┐        ╱ iPhone ╱  │
 │    ╲ phone   ╲       │    MacBook     │       ╱  phone  ╱   │
 │     ╲ (angled ╲      │  (landing page │      ╱ (angled ╱    │
 │      ╲ inward) ╲     │   screenshot)  │     ╱  inward) ╱    │
 │                      └──────┬──┬──────┘                      │
 │ ░░ yellow tape, tilted -6°:  FREE · FREE · FREE · FREE ░░░ │
 │ ░░ yellow tape, tilted +5°:  NO PAYMENT · NEVER CHARGED ░░ │
 │                                                            │
 │        Start now: keystonee.vercel.app   [ QR code ]       │
 └────────────────────────────────────────────────────────────┘
```

- The two phones are rotated about 18 to 22 degrees toward the centre, slightly lower than the laptop, with soft shadows. Together with the laptop they form a shallow curved arc.
- Phones overlap the laptop edges by about 8% to feel connected.
- Use a plain flat device mockup (no brand logos on the devices other than the screens). Android phone: punch-hole camera. iPhone: Dynamic Island.

## 3. Yellow "crime-scene tape" idea

Like police tape around a crime scene, but it seals the **price**, not a place. The message: "the paywall is sealed off, you will never pay."

- Two diagonal tape strips crossing the lower third of the poster, running edge to edge and slightly past the poster edges.
- Colour: tape yellow `#FFD400`, text black `#111111`, bold condensed sans (Anton, Bebas Neue, or Archivo Black), all caps, wide letter spacing.
- A thin dark edge and a slight crease texture so it looks like real tape. One strip tilted about -6 degrees, the other +5 degrees.
- The tape crosses the bottom of the laptop and the phones slightly, so it feels like it wraps the whole scene.
- Text on the tape repeats with a small dot or diamond between each repeat.
- Yellow is the only colour outside the brand palette. Keep it to the tape alone.

## 4. Brand colours (take them from the website)

| Use | Name | Hex |
|---|---|---|
| Main brand, background, buttons | Violet | `#6b26d9` |
| Deep shade (shadows, gradients) | Dark violet | `#5a1fb8` |
| Dark text, deepest shade | Midnight | `#2a1163` |
| Accent 1 | Cyan | `#0bb8da` |
| Accent 2 | Pink | `#eb4799` |
| Soft tint for panels | Lilac | `#e6dafb` / `#f4effd` |
| Light background option | Mist | `#eef0f4` |
| WhatsApp mention only | WhatsApp green | `#1fa855` |
| Tape only | Tape yellow | `#FFD400` |

Suggested background: violet `#6b26d9` fading to dark violet `#5a1fb8` at the bottom, with a faint lilac palm-leaf or grid pattern at 8% opacity (the website landing page uses a palm leaf). Cyan and pink used as small shapes behind the devices (rounded folder-tab shapes like the website).

## 5. Typography

- Headline: Plus Jakarta Sans, ExtraBold 800 (the website font). "Completely free" can be in cyan `#0bb8da`.
- Subline and body: Plus Jakarta Sans Medium.
- Numbers and URL: JetBrains Mono SemiBold.
- Tape: Anton or Bebas Neue.
- Wordmark: the "KEYSTONE" logo from `static/img/logo-full.svg`; icon only from `static/img/logo-mark.svg`.

## 6. Screenshots to put on the devices

Take these **real** screenshots (do not let an AI invent the website):

| Device | Page | Size to capture |
|---|---|---|
| MacBook | Landing page, `keystonee.vercel.app` (the "Exam ready" hero with the three coloured folder cards) | 1440 x 900 |
| Android (left) | `/tests` (the list of papers) | 390 x 844 |
| iPhone (right) | `/progress` after taking one test, or `/study` | 390 x 844 |

Tip: take the phone shots in browser dev tools with mobile view, after a test, so the progress page has real numbers.

## 7. Sizes to export

| Where | Size | Note |
|---|---|---|
| Instagram and LinkedIn feed | 1080 x 1350 (4:5) | main version |
| Instagram and Facebook story, WhatsApp status | 1080 x 1920 (9:16) | keep text away from the top 250 px and bottom 340 px |
| Facebook and LinkedIn link post, X | 1200 x 628 | stack the devices closer together |
| Square fallback | 1080 x 1080 | |

Export PNG, under 5 MB. Keep headline text at least 64 px so it is readable on a phone.

## 8. Image-generator prompt (copy and paste)

> Flat, modern product launch poster, portrait 4:5. Background: rich violet #6b26d9 fading to darker violet #5a1fb8, subtle lilac palm-leaf pattern. Center: a silver MacBook, front view, large. Left and right of it: an Android phone on the left and an iPhone on the right, each angled about 20 degrees inward toward the laptop so the three devices form a gentle curved arc, soft shadows, small cyan #0bb8da and pink #eb4799 rounded folder-tab shapes behind them. Leave the three screens as plain blank light panels (screenshots will be added later). Across the lower third, two diagonal yellow police crime-scene tapes in #FFD400 with black bold condensed capital text, one tilted -6 degrees and one +5 degrees, wrapping slightly over the device bottoms. Big white bold headline at the top. Clean, high contrast, no extra logos.

AI tools garble text and screens. Generate only the background, devices and tape, then add the headline, screenshots, logo and URL yourself in Canva or Figma.

## 9. Captions (copy and paste)

### LinkedIn
Launching Keystone today: free GATE mock tests built from the official papers.

13 official GATE papers, 845 questions, the official answer key, the GATE marking scheme, timed tests, a weak-topic report, a study timer and a plan you write yourself. It runs on your laptop or phone and installs like an app.

It is completely free. No payment, no card, now or later.

Try it: keystonee.vercel.app

#GATE #GATE2027 #ComputerScience #DataScience #MockTest #Students #EdTech #FreeLearning

### Instagram
Keystone is live. 🚀
Free GATE mock tests from the official papers, with the official keys.
Timed tests. Scores. Weak topics. Study timer. Zero cost, ever.
Link in bio: keystonee.vercel.app

#GATE #GATE2027 #GATECSE #GATEDA #MockTest #Engineering #StudyTools #FreeResources

### Facebook and WhatsApp
Keystone launched today. 🎉
Free GATE CS and DA mock tests made from the official GATE papers, with the official answer keys. Timed, auto-scored, with a report on your weak topics.
Completely free. Never charged.
Start here: keystonee.vercel.app
Updates and doubts: join our WhatsApp group (link in the website menu).

## 10. Checklist before posting

- [ ] Real screenshots on all three devices
- [ ] URL is exactly `keystonee.vercel.app`
- [ ] No "AI" claim anywhere
- [ ] Tape is the only yellow
- [ ] Exported 4:5, 9:16 and 1.91:1 versions
- [ ] Open the live site once before 12:00 and take one test to make sure sign-in works
