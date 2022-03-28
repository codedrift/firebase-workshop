import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
const provider = new GoogleAuthProvider();

type UserData = {
  id: string;
  name: string;
  dnd: boolean;
};

function login() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Login success", result);
    })
    .catch((error) => {
      console.error("Login error", error);
    });
}

async function logout() {
  const auth = getAuth();
  await auth.signOut();
}

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const auth = getAuth();
    // every "listener" returns a unsubscribe function that should be used to clean up resources
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // unsubscribe snapshot listener when component gets unmounted
    return unsub;
  }, []);

  return {
    user,
  };
}

function useUserData(userId?: string) {
  const [data, setData] = useState<UserData>({
    dnd: false,
    name: "",
    id: "",
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    const db = getFirestore();
    // every "listener" returns a unsubscribe function that should be used to clean up resources
    const unsubscribe = onSnapshot(doc(db, "users", userId), (d) => {
      setData({
        ...d.data(),
        // id is not part of the document itself. It is provided via the document metadata
        id: d.id,
      } as UserData);
    });

    // unsubscribe snapshot listener when component gets unmounted
    return unsubscribe;
  }, [userId]);

  return data;
}

async function setDnd(userId: string, newValue: boolean) {
  console.log("setDnd", {
    userId,
    newValue,
  });
  if (userId === "" || newValue === undefined) {
    return;
  }
  const db = getFirestore();
  await setDoc(
    doc(db, "users", userId),
    {
      dnd: newValue,
    },
    {
      // this instructs firebase to only update specified values
      merge: true,
    }
  );
}

function App() {
  const { user } = useAuth();
  const userData = useUserData(user?.uid);

  console.log("App", {
    user,
    userData,
  });

  if (!user) {
    return (
      <div>
        Please log in
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <button onClick={logout}>logout</button>
      <h3>Auth User</h3>
      <code>
        {JSON.stringify(
          [user].filter(Boolean).map((a) => ({
            displayName: a.displayName,
            uid: a.uid,
            email: a.email,
          })),
          null,
          2
        )}
      </code>
      <h3>User data</h3>
      <button onClick={() => setDnd(user.uid, !userData.dnd)}>
        toggle dnd
      </button>
      <code>{JSON.stringify(userData, null, 2)}</code>
    </div>
  );
}

export default App;
