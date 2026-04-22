# Ishika Dubey — Portfolio Website

Ultra-modern, interactive portfolio. Ready to run in VS Code.

---

## 📁 Folder Structure

```
ishika-portfolio/
├── index.html          ← Main website
├── style.css           ← All styles
├── script.js           ← All interactions
├── assets/
│   ├── profile.jpg     ← ⭐ ADD YOUR PHOTO HERE
│   └── Ishika_Dubey_Resume.pdf  ← ⭐ ADD YOUR RESUME HERE
└── README.md
```

---

## ⚡ Running Locally (VS Code)

### Option A — Live Server (Recommended)
1. Open VS Code
2. Install extension: **Live Server** by Ritwick Dey
3. Right-click `index.html` → **"Open with Live Server"**
4. Opens at `http://127.0.0.1:5500`

### Option B — Simple double-click
- Just open `index.html` in any browser (Chrome recommended)
- Some devicon images need internet to load

---

## 🖼️ Adding Your Profile Photo

1. Get your photo (headshot recommended, square crop)
2. Name it `profile.jpg`
3. Place it in the `assets/` folder
4. The site will auto-display it — fallback placeholder shows otherwise

---

## 📄 Adding Your Resume

1. Place `Ishika_Dubey_Resume.pdf` in the `assets/` folder
2. The Download CV button will work automatically

---

## 🚀 Deploy to GitHub Pages (Free)

```bash
# 1. Create GitHub repo named: ishika17dubey.github.io
# 2. Upload all files (index.html, style.css, script.js, assets/)
# 3. Go to: Settings → Pages → Source: main branch
# 4. Your site: https://ishika17dubey.github.io
```

## 🚀 Deploy to Netlify (Even Easier)

1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `ishika-portfolio/` folder onto the dashboard
3. Done! Live URL in 30 seconds. Custom domain available free.

---

## ✨ Features

- 🌌 Animated particle canvas (mouse-reactive)
- 🖱️ Custom cursor with hover effects
- 🃏 3D tilt card effect on all cards
- 📊 Animated skill progress bars
- 🔄 Role text slider in hero
- 🔢 Number counter animation
- 🎭 Scroll reveal animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🏷️ Infinite scrolling certifications marquee
- 🖼️ Profile photo with fallback placeholder

---

## 🎨 Customization

Edit CSS variables at the top of `style.css`:
```css
:root {
  --cyan: #00f5d4;    /* Change accent color */
  --violet: #8b5cf6;  /* Change secondary color */
}
```
