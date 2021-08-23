import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// import dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();

const LoginPage = () => {
    var firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDING_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); 
    }

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const [user] = useAuthState(auth);

    const SignIn = () => {
        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
        
        return(
            <div>
                <h2>Sign in</h2>
                <button onClick={signInWithGoogle}>Google</button>
                <button>Email</button>
            </div>
        )
    }
    console.log(user ? "hi" : "bye")
    return (
        <div>
            {user ? <h1>sign out</h1> : <SignIn /> }
        </div>
    )
}

export default LoginPage