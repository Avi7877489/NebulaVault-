import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCSbJi_eq6wAkCmObY_jZEWYyUECZK8X2w",
    authDomain: "react-305.firebaseapp.com",
    databaseURL: "https://react-305-default-rtdb.firebaseio.com",
    projectId: "react-305",
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);