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
import { useHistory } from 'react-router-dom';

require('dotenv').config();

const LoginPage = ({SetCurrentUser}) => {
    let history = useHistory();

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
    console.log(auth.currentUser)
    SetCurrentUser(user?.displayName)

    const SignIn = () => {
        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }

        const signInAnonymously = () => {
            auth.signInAnonymously();
        }
        
        return(
            <div>
            <Card>
            <Card.Body>
                <Card.Title>Sign in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Select one of options below to begin chatting!</Card.Subtitle>
                <div className="d-grid gap-2">
                <Button className="signInButton" onClick={signInWithGoogle} variant="dark">Sign in with Google</Button>
                <Button className="signInButton"  variant="secondary"  onClick={signInAnonymously}>Chat Anonymously</Button>
                </div>
            </Card.Body>
            </Card>
            </div>
        )
    }

    const SignOut = () => {
        history.push('/chattingRoom')

        const handleSignOut = () => {
            auth.signOut()
            history.push('/')
        }
        return (
            <div>
             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>Online Chatting Room</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={2} onClick={handleSignOut}>
                        Sign out
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
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