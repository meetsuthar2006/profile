# Meet Suthar — AI / ML Engineer Portfolio

A dark, editorial-style personal portfolio built with vanilla HTML, CSS, and JavaScript. Inspired by high-end creative portfolios, featuring cinematic animations, a magnetic custom cursor, smooth scroll, and a fully responsive layout.

---

## 🗂️ Project Structure

```
profile/
├── index.html                  ← Main HTML file (all sections)
├── styles.css                  ← All styles & responsive rules
├── script.js                   ← All animations & interactions
├── README.md                   ← You are here
└── assets/
    └── images/
        ├── README.md           ← Image guide (what goes where)
        ├── profile/            ← Your photo (meet.jpg)
        ├── education/          ← School / college / cert logos
        ├── projects/           ← Project screenshots
        └── misc/               ← Awards, badges, other images
```

---

## 🧩 Sections

| # | Section | Description |
|---|---------|-------------|
| — | **Nav** | Fixed top bar with logo, links, CTA, mobile overlay menu |
| — | **Hero** | Full-screen intro — animated headline, marquee ticker, scroll indicator |
| 01 | **About** | Bio, sticky left title, animated stats counter |
| 02 | **Work** | 4 featured ML projects — editorial list with image reveals |
| 03 | **Skills** | 3 columns: ML & Deep Learning · Data & Visualization · MLOps & Cloud |
| 04 | **Education** | Vertical timeline — B.Tech, 12th, ML Specialization |
| 05 | **Achievements** | 3×2 grid — hackathon, Kaggle, GitHub, certs, research, accuracy |
| 06 | **Contact** | Split layout — details + contact form |
| — | **Footer** | Logo, copyright, back-to-top |

---

## ⚙️ Libraries & Fonts

### JavaScript
| Library | Version | Purpose |
|---------|---------|---------|
| [GSAP](https://greensock.com/gsap/) | 3.12.5 | Animations, ScrollTrigger, entrance timelines |
| [Lenis](https://github.com/darkroomengineering/lenis) | 1.1.14 | Buttery smooth inertia scrolling |
| [Font Awesome](https://fontawesome.com/) | 6.5.0 | UI icons throughout |
| [Devicons](https://devicons.github.io/devicon/) | latest | Tech stack icons in skills section |

### Fonts (Google Fonts)
| Font | Usage |
|------|-------|
| **Playfair Display** | Section titles, hero headline, project names |
| **DM Sans** | Body text, descriptions, nav links |
| **Space Mono** | Labels, numbers, monospace accents |

---

## 🎨 Design Tokens

Edit these CSS variables in `styles.css` to retheme the entire site:

```css
:root {
  --bg:        #0a0a0a;   /* Main background */
  --bg-2:      #111111;   /* Alternate section background */
  --bg-3:      #161616;   /* Card / surface background */
  --surface:   #1a1a1a;   /* Elevated surface */
  --border:    rgba(255,255,255,0.08); /* Subtle borders */
  --accent:    #c8ff00;   /* Acid green — primary accent */
  --accent-dim:rgba(200,255,0,0.12);  /* Accent tint for backgrounds */
  --text:      #f0f0f0;   /* Primary text */
  --text-muted:#666;      /* Secondary / label text */
  --text-dim:  #999;      /* Tertiary / description text */
}
```

---

## ✨ Features

- **Custom magnetic cursor** — blend-mode difference, "VIEW" label on project hover, magnetic pull on buttons
- **GSAP entrance timeline** — hero animates in on load with staggered lines
- **ScrollTrigger reveals** — every section fades/slides in on scroll
- **Lenis smooth scroll** — synced with GSAP ticker for zero jank
- **Parallax project images** — subtle depth on scroll
- **Animated skill bars** — fill on scroll into view (50–60% range — honest learner)
- **Counter animation** — stats count up when about section enters viewport
- **Education timeline** — dot glows, card slides on hover
- **Achievement cards** — accent underline sweeps on hover
- **Mobile overlay menu** — full-screen nav with large serif links
- **Scroll progress bar** — thin accent line at top of page
- **Form feedback** — send state animation with color transition
- **Grain texture overlay** — animated noise for depth

---

## 🖼️ Adding Your Images

See **`assets/images/README.md`** for the full guide.

Quick reference:

```
assets/images/profile/meet.jpg                    ← your photo
assets/images/education/university-logo.png       ← B.Tech institute logo
assets/images/education/school-logo.png           ← 12th school logo
assets/images/education/deeplearningai-logo.png   ← ML cert logo
assets/images/projects/house-price.jpg            ← Project 01
assets/images/projects/sentiment-analysis.jpg     ← Project 02
assets/images/projects/stock-predictor.jpg        ← Project 03
assets/images/projects/rag-qa.jpg                 ← Project 04
```

> Education logos have a smart fallback — if the file is missing, a Font Awesome icon shows instead. No broken images.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| `> 1200px` | Full layout — sticky about/contact left column |
| `≤ 1200px` | Single column about & contact, smaller nav padding |
| `≤ 900px` | Mobile nav (hamburger), stacked project cards, single-column skills |
| `≤ 600px` | Compact padding, stacked form rows, single-column achievements |

---

## 🚀 Running Locally

No build step needed — it's plain HTML/CSS/JS.

```bash
# Option 1 — VS Code Live Server (recommended)
# Install the "Live Server" extension, right-click index.html → Open with Live Server

# Option 2 — Python
python -m http.server 3000
# then open http://localhost:3000

# Option 3 — Node.js
npx serve .
# then open http://localhost:3000
```

> ⚠️ Open via a local server, not by double-clicking `index.html`. Some browsers block local font/image loading from `file://` protocol.

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Responsive, cursor disabled |

---

## 📬 Contact

**Meet Suthar** — AI / ML Engineer  
📧 meetsuthar2006@gmail.com  
📍 India
