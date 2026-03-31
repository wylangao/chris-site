# Christopher Cumberbatch — Personal Site

A bold, campaign-style personal website built with **React + Vite**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to GitHub Pages / Vercel / Netlify

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Deploy to Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"** → Import your GitHub repo
3. It auto-detects Vite — click **Deploy**
4. Your site is live!

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your repo, set build command to `npm run build` and publish directory to `dist`
4. Click **Deploy**

## Editing the Site

All content is in `src/App.jsx`. Key things to customize:

- **Colors**: Change the constants at the top (`BLUE`, `ORANGE`, etc.)
- **Photo**: Replace `public/chris.jpg` with your photo
- **Text content**: Edit directly in each section component
- **Fonts**: Change the Google Fonts import in the `<style>` block

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.
