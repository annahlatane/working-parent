# Working Parent Simulator 🎮

> Two kids under 5. One very full day. A decision game for working parents — and everyone who wonders what's behind the camera-off icon.

Built for Mother's Day. Shareable on LinkedIn. Mobile-optimized.

---

## Deploy to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site on every push to `main`.

### One-time setup

1. Go to the repo on GitHub: [annahlatane/working-parent](https://github.com/annahlatane/working-parent)
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

That's it. The next push to `main` (or a manual trigger from the **Actions** tab) will deploy the site.

### Your game is live at:

```
https://annahlatane.github.io/working-parent/
```

That's the link to share on LinkedIn. ✅

---

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## LinkedIn post template

After playing, the game generates copy-paste text for LinkedIn. Replace `[link]` with your GitHub Pages URL before posting.

---

## Tech stack

- React 18
- Vite 5
- Google Fonts (Playfair Display, Nunito, DM Mono)
- GitHub Actions for CI/CD
- GitHub Pages for hosting (free)

---

*Made with 💙 in honor of every working parent.*
