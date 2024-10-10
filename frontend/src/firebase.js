// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC4-SR4toU2cTk0SR4hjHqYi11daftQDpc",
	authDomain: "webathon24.firebaseapp.com",
	projectId: "webathon24",
	storageBucket: "webathon24.appspot.com",
	messagingSenderId: "812566512782",
	appId: "1:812566512782:web:bd7b690eaeb2da971375df",
	measurementId: "G-0SLRR0XV1X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
