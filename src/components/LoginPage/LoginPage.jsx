import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './styles.css'

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
            <Card>
            <Card.Body>
                <Card.Title>Sign in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Sign in using one of the options below</Card.Subtitle>
                <div className="d-grid gap-2">
                <Button className="signInButton" onClick={signInWithGoogle} variant="dark">Sign in with Google</Button>
                {/* <Button className="signInButton" variant="dark">Sign in with Email</Button> */}
                <Button className="signInButton"  variant="secondary">Browse Anonymously</Button>
                </div>
            </Card.Body>
            </Card>
            </div>
        )
    }

    const SignOut = () => {
        return (
            <div>
                  <Navbar bg="dark" variant="dark">
                    <Container>
                    <Nav>
                        <Nav.Item >
                            <Nav.Link onClick={() => auth.signOut()} >Sign out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }

    return (
        <div>
            {user ? <SignOut /> : <SignIn /> }
        </div>
    )
}

export default LoginPage