// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCiNDe23d7-gwHss8Fh0uwIrOWNzp5gFag',
	authDomain: 'ty-firebase-e93d8.firebaseapp.com',
	projectId: 'ty-firebase-e93d8',
	storageBucket: 'ty-firebase-e93d8.appspot.com',
	messagingSenderId: '545691871125',
	appId: '1:545691871125:web:f6213e63a1a068c84cb89c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
