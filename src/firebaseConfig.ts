// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3jrqMf1xaPquyHSS7D5ceuM3Cu6cnSTw",
  authDomain: "sherpa-89f20.firebaseapp.com",
  databaseURL: "https://sherpa-89f20.firebaseio.com",
  projectId: "sherpa-89f20",
  storageBucket: "sherpa-89f20.appspot.com",
  messagingSenderId: "245729270790",
  appId: "1:245729270790:web:6ab83464ad99eea4ef3787",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider)
    .then((result) => {
      // Handle successful sign-in
      console.log(result.user);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}

export function signOutOfGoogle(): void {
  auth.signOut();
}

export const storage = getStorage(app);

export default app;
