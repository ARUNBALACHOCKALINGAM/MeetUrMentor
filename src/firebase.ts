// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider,GithubAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4aKL43unL2RMT9qNgtS_RK05ebqiE1K0",
  authDomain: "mentorme-70587.firebaseapp.com",
  projectId: "mentorme-70587",
  storageBucket: "mentorme-70587.firebasestorage.app",
  messagingSenderId: "430653119373",
  appId: "1:430653119373:web:f1f4667f9ed93095ca3bc4",
  measurementId: "G-4QCE8NBQBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();


export default app;