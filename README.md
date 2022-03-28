# firebase-workshop

## 1. Create a project at https://console.firebase.google.com/

- Pick a unique name for your project
  - Analytics is not necessary for this workshop

## 2. Add a new "app" and configure project

Go to Console -> Overview

On the Project overview page click "Add app (web)" and give it some name.

Now update the config files

- web/src/index.tsx (used to identify the project within the client)

## 3. Enable Authentication

Go to Console -> Authentication

Enable Google Auth. Set yourself as "Project Support email"

## 4. Enable firestore

Go to Console -> Firestore Database -> Create Database

Start in test mode. You can update the security rules later on

## 5. Start the web client

```bash
cd web
npm i
npm start
```

Go to http://localhost:3000

Login with your Google account

## 6. Start an admin backend

There is a Java backend and a Nestjs backend that show how to interact with firestore as admin. Pick your favorite or write your own. Both projects only do the bare minimum.

To use them

1. Update the projectId and database url (credentials are provided via google default credentials)

- java-backend/src/main/java/com/example/demo/DemoApplication.java
- nestjs-backend/src/main.ts

2. Update the userId in the "/toggle" route
3. `curl localhost:8080/toggle`

See the value being updated in the frontend! It's magic!

## 7. Deploy web & firestore rules

Update `.firebaserc` with your project id

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

You can now view your web app at https://<your-project-id>.web.app

Deploy only firestore rules

```bash
firebase deploy --only firestore:rules
```

## 8. Now go out and play! Break stuff!

Here is some inspiration:

- Extend the user document with more values
- Add a subcollection to the user

-> https://firebase.google.com/docs/firestore/data-model

- Add a snapshot listener to an entire collection

-> https://firebase.google.com/docs/firestore/query-data/listen

- Write some security rules
- Prevent user A from accessing data from user B

-> https://firebase.google.com/docs/firestore/security/get-started

- Implement role based access

-> https://firebase.google.com/docs/firestore/solutions/role-based-access

- Add a cloud firestore hook that gets triggered when a document is added to a collection

-> https://firebase.google.com/docs/functions/firestore-events
