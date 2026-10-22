# Mohammad Sohel, Portfolio

A one-page developer portfolio built with React and Vite. Fonts are bundled (no Google Fonts requests), and the page has light and dark themes.

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Edit your content

Everything lives in `src/data.js`: profile, experience, projects, skills, education.
Add your real links there:

- `profile.linkedinUrl` and `profile.githubUrl`
- `code` and `demo` for each project

Colors, fonts and spacing are tokens at the top of `src/index.css`.

## Add real photos

Photos are optional. Nothing shows (and nothing breaks) until you add a file.

- **Your portrait:** save it as `src/assets/photo.jpg` (jpg, png or webp). Use a 4:5 portrait crop, at least 640 x 800 px. It appears in the About section.
- **Project screenshots:** save them in `src/assets/projects/` named after the project slug in `src/data.js`:
  - `support-chatbot.jpg`
  - `skill-passport.jpg`
  - `transport-app.jpg`

  Use 16:10 crops, about 960 x 600 px. Real screenshots of your own work look best.

## Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). Click **Deploy**.

Or from the terminal:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Push this folder to GitHub.
2. Go to https://app.netlify.com/start and import the repository.
3. The included `netlify.toml` sets the build command and publish folder. Click **Deploy**.

Or drag and drop: run `npm run build`, then drop the `dist` folder onto https://app.netlify.com/drop.

### Custom domain

Both services let you add a domain under Settings, then Domains. Free subdomains look like `your-name.vercel.app` or `your-name.netlify.app`.
