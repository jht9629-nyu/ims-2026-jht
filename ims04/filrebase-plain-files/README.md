# Firebase Notes — Plain JS Starter

A single-file web app: Google sign-in + Cloud Firestore + Firebase Hosting. No build step, no framework.

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com → **Add project**

- default use gemni
- no analtics
- no firebase hosting (try later)

2. In the project, click the web icon (`</>`) to register a web app. Copy the `firebaseConfig` object.

- use <script> tag

3. **Build → Authentication → Get started → Sign-in method → Google → Enable**

- Important: To enable Google sign-in for your Android apps, you must provide the SHA-1 release fingerprint for each app (go to Project Settings > Your apps section).

4. **Build → Firestore Database → Create database → Start in production mode** (we'll set rules below)

## 2. Paste your config

- found under Project settings | General

Open `index.html` and replace the placeholder `firebaseConfig` object near the top of the `<script>` block with the one from your Firebase console.

## 3. Set Firestore security rules

In the Firebase console → Firestore → **Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, delete: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }
  }
}
```

This ensures users can only read, create, and delete their own notes.

## 4. Run locally

Because the app uses ES modules, you need to serve it over HTTP (not `file://`). Any of these work:

```bash
# Python
python3 -m http.server 5000

# Node
npx serve .
```

Then open http://localhost:5000.

- Sign-in failed: Firebase: Error (auth/unauthorized-domain).
- using liver server
  http://127.0.0.1/
- changed to url http://localhost:5502/
- Add
  2026-04-09T07:14:27.117Z] @firebase/firestore: Firestore (10.12.0): Uncaught Error in snapshot listener: FirebaseError: [code=failed-precondition]: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/fb-notes-7d54a/firestore/indexes?create_composite=Ckxwcm9qZWN0cy9mYi1ub3Rlcy03ZDU0YS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvbm90ZXMvaW5kZXhlcy9fEAEaBwoDdWlkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
  overrideMethod @ installHook.js:1Understand this error

[2026-04-09T07:17:03.356Z] @firebase/firestore: Firestore (10.12.0): Uncaught Error in snapshot listener: FirebaseError: [code=failed-precondition]: The query requires an index. That index is currently building and cannot be used yet. See its status here: https://console.firebase.google.com/v1/r/project/fb-notes-7d54a/firestore/indexes?create_composite=Cldwcm9qZWN0cy9mYi1ub3Rlcy03ZDU0YS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvbm90ZXMvaW5kZXhlcy9DSUNBZ09qWGg0RUsQARoHCgN1aWQQARoNCgljcmVhdGVkQXQQAhoMCghfX25hbWVfXxAC

- waited a few minutes for index

- show all and allow deletes

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, create: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

**Note:** For Google sign-in to work locally, add `localhost` under Firebase console → Authentication → Settings → Authorized domains (it's usually there by default).

## 5. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

When prompted:

- **Use an existing project** → pick the one you created
- **Public directory** → `.` (current directory)
- **Single-page app?** → No
- **Set up automatic builds with GitHub?** → No
- **Overwrite index.html?** → **No** (important!)

Then:

```bash
firebase deploy
```

You'll get a live URL like `https://your-project.web.app`. Add that domain to Authentication → Settings → Authorized domains if it isn't there already.

## What you get

- Google sign-in via popup
- Live-syncing notes list (Firestore `onSnapshot`)
- Per-user note isolation enforced by security rules
- Add / delete notes
- Sign out

## Next steps to explore

- Add edit-in-place for notes
- Swap `signInWithPopup` for `signInWithRedirect` (better on mobile)
- Add email/password auth alongside Google
- Add a `updatedAt` field and sort/filter options
