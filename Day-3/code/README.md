# Notes App — React + Firebase (Auth + Firestore + Hosting)

A minimalist, production-ready notes app built with **React (Vite)** and **Firebase**. It supports **Google Sign-In**, per-user notes stored under `users/{uid}/notes`, real‑time sync via Firestore, and one-command deploy to **Firebase Hosting**.

---

## 1) Setup

### Create Firebase project
1. Go to https://console.firebase.google.com and create a project.
2. **Build → Authentication → Sign-in method**: Enable **Google** provider.
3. **Build → Firestore Database**: Create a database (Production mode).

### Add web app & get config
1. **Project settings → Your apps → Web app** → Register app.
2. Copy the SDK config values.

### Configure environment
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```
Then edit `.env`:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Install & run
```bash
npm i
npm run dev
```

Visit the local dev URL, sign in with Google, and start creating notes.

---

## 2) Firestore Security Rules

This repository includes `firestore.rules` to restrict access so users can only read/write their own notes:
```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

To deploy rules:
```bash
npm i -g firebase-tools
firebase login
firebase init firestore
# When prompted for rules, select existing file: firestore.rules
```

---

## 3) Deploy to Firebase Hosting

Initialize hosting (only once per project):
```bash
firebase init hosting
# - Use existing project
# - Public directory: dist
# - Single-page app rewrite: Yes
# - GitHub action: optional
```

Build & deploy:
```bash
npm run build
firebase deploy
```

Your app will be live at the hosting URL shown after deploy.

---

## 4) Project Structure

```
notes-app-react-firebase/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Notes.jsx
│  │  └─ SignIn.jsx
│  ├─ App.jsx
│  ├─ firebase.js
│  ├─ index.css
│  └─ main.jsx
├─ .env.example
├─ firestore.rules
├─ firebase.json
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## 5) How it works

- **Auth**: Google sign-in via Firebase Auth. The session state is observed with `onAuthStateChanged`.
- **Data model**: Per-user subcollection: `users/{uid}/notes` with fields `{ title, content, createdAt, updatedAt }`.
- **Realtime**: UI subscribes to `onSnapshot(query(..., orderBy('updatedAt', 'desc')))`. Edits auto-save (debounced).
- **Security**: Firestore rules ensure a user can only access their own notes.
- **Hosting**: Vite builds to `dist/`. `firebase.json` rewrites all paths to `/index.html` for SPA routing.

---

## 6) Optional Enhancements

- Add full-text search (client-side), tags, or archived notes.
- Add sharing with specific users (extra rules + UI).
- Turn into a PWA for offline use and installability.
- Add rich text (e.g., TipTap/Quill) instead of textarea.

---

**Enjoy!**
