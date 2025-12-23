import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyD-EXAMPLE-KEY",
    authDomain: "nebulavault.firebaseapp.com",
    databaseURL: "https://nebulavault-default-rtdb.firebaseio.com",
    projectId: "nebulavault",
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);