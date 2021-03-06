// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrm8MJo8UHxYaso8tXSWDJ4Dhy3ohVQmg",
  authDomain: "nwhacks-f42df.firebaseapp.com",
  projectId: "nwhacks-f42df",
  databaseURL: "https://nwhacks-f42df-default-rtdb.firebaseio.com",
  storageBucket: "nwhacks-f42df.appspot.com",
  messagingSenderId: "717144736521",
  appId: "1:717144736521:web:c523e58d3cda7c84d949d8",
  measurementId: "G-N67G6JCZ9T",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const login = async () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const readUserData = async (userId) => {
    const db = getDatabase();
    let snapshot = await get(ref(db, 'Users/' + userId));

    if (snapshot.exists()) {
        let data = await snapshot.val();
        console.log(data);
        return data;
    }
};

const writeUserData = async (userId, data) => {
    const db = getDatabase();
    set(ref(db, 'Users/' + userId), data);
};

const updateUserData = async (userId, data) => {
    const db = getDatabase();
    update(ref(db, 'Users/' + userId), data);
};

const db = getDatabase();
const usersRef = ref(db, "Users");

export { login, usersRef, readUserData, writeUserData, updateUserData };
