import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getMessaging } from "firebase/messaging"

// const firebaseConfig = {
//     apiKey: "AIzaSyDKj9_7_YAVJLSpa842C350q87wudfQai4",
//     authDomain: "mern-63336.firebaseapp.com",
//     projectId: "mern-63336",
//     storageBucket: "mern-63336.firebasestorage.app",
//     messagingSenderId: "748700307700",
//     appId: "1:748700307700:web:167b8e21c8ac2e0fd04ea1",
//     measurementId: "G-LCD0XNBWF6"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBIBUWdyhyuarvOPZBrXqSgeJxgInUwOq4",
    authDomain: "chatapp-f7b94.firebaseapp.com",
    projectId: "chatapp-f7b94",
    storageBucket: "chatapp-f7b94.appspot.com",
    messagingSenderId: "381363223346",
    appId: "1:381363223346:web:8fc1305512d2cd04ff752b",
    measurementId: "G-3Y5L3P22MY"
};




const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const messaging = getMessaging(app);