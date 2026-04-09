import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAR_kw3spmodjUMIT_hD4oDL55DjrZIjM",
    authDomain: "udoan604-28b9e.firebaseapp.com",
    projectId: "ludoan604-28b9e",
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);