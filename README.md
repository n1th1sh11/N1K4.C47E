# N1K4.ch47 — Hacker Terminal UI

A high-fidelity, immersive React application that simulates a secure hacker terminal. This project demonstrates advanced frontend capabilities including simulated real-time states, CSS-only CRT/scanline effects, polished micro-interactions, and integration with the Gemini API to power a persona-based AI chatbot ("N1K4").

### Key Features
*   **Immersive UI**: Custom Tailwind configuration for neon aesthetics, scanlines, CRT flicker, and glitch text effects.
*   **Gemini AI Integration**: Uses the Google Gemini API to power the "N1K4" persona, responding in character to user queries. Falls back gracefully to simulation mode if no API key is present.
*   **Responsive Design**: Fully functional on mobile and desktop, adhering to a strict "mobile-first" approach.
*   **Polished UX**: Loading states, typing indicators, smooth message entry animations, and soundless feedback loops.
*   **Modern Tech Stack**: Built with React 18, TypeScript, and Tailwind CSS.

### Deployment Instructions

**Prerequisites**:
1.  A Google Gemini API Key.
2.  Node.js installed.

**Deploy to Vercel (Recommended)**:
1.  Push this code to a GitHub repository.
2.  Import the repository into Vercel.
3.  In the Vercel Project Settings > Environment Variables, add:
    *   Key: `API_KEY`
    *   Value: `your-google-gemini-api-key`
4.  Deploy. Vercel automatically detects Vite/React configuration.

**Deploy to GitHub Pages**:
1.  In `package.json`, add `"homepage": "https://<username>.github.io/<repo-name>"`.
2.  Install `gh-pages`: `npm install gh-pages --save-dev`.
3.  Add scripts to `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
4.  Run `npm run deploy`.
    *Note: API keys in `.env` files are not secure on client-side GitHub Pages without a proxy. For a demo, stick to Vercel functions or local testing.*

### Local Development
1.  Clone the repo.
2.  Create a `.env` file in the root: `API_KEY=your_key_here`.
3.  Run `npm install`.
4.  Run `npm run dev`.
5.  Open the localhost link in your browser.
