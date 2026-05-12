# Working Parent Simulator 🎮

> Two kids under 5. One very full day. A decision game for working parents — and everyone who wonders what's behind the camera-off icon.

Built for Mother's Day. Shareable on LinkedIn. Mobile-optimized.

---

## Deploy to GitHub Pages (5 minutes)

### 1. Create a new GitHub repo

Go to [github.com/new](https://github.com/new) and create a new **public** repository.  
Name it something like `working-parent-simulator`.

### 2. Push this code to your repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to **gh-pages**, folder to **/ (root)**
5. Click **Save**

### 4. Wait ~2 minutes

GitHub Actions will automatically build and deploy when you push to `main`.  
Watch the progress under the **Actions** tab.

### 5. Your game is live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
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
