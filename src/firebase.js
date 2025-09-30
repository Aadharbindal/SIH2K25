import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq_0e-T3vS0Vr0HKSIg102Mf-t3MVQ_Wo", // Replaced with your actual Firebase API Key
  authDomain: "mining-90eeb.firebaseapp.com",
  projectId: "mining-90eeb",
  storageBucket: "mining-90eeb.appspot.com",
  messagingSenderId: "973225809875",
  appId: "1:973225809875:web:c5bd6abf1f042c5a484126"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
