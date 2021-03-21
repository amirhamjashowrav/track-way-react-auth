import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import googleIcon from '../../images/google.png';
import fbIcon from '../../images/fb.png';
import './Login.css';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = (e) => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((response) => {
                const { displayName, email } = response.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    loggedIn: true,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(response);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        e.preventDefault();
    };
    const handleFacebookSignIn = (e) => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then(function (result) {
                var user = result.user;
                console.log(user);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        e.preventDefault();
    };

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    console.log(response.user);
                    const { displayName, email } = response.user;
                    const signedInUser = {
                        name: user.name,
                        email: email,
                        loggedIn: true,
                    };
                    setLoggedInUser(signedInUser);
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);

                    history.replace(from);
                })
                .catch(function (error) {
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(errorMessage);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const { displayName, email } = response.user;
                    const signedInUser = {
                        name: displayName,
                        email: email,
                        loggedIn: true,
                    };
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                })
                .catch(function (error) {
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    };
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user
            .updateProfile({
                displayName: name,
            })
            .then(function () {
                console.log("user name updated successfully");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="container signup-card">
            <h2 className="text-dark text-center">{newUser ? "Create an account" : "Log in"}</h2>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="name" class="form-control" id="exampleInputEmail1" onBlur={handleBlur}/>      
                </div>
                )}
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onBlur={handleBlur}/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onBlur={handleBlur}/>
                    </div>
                <button type="submit" class="btn btn-primary loginButtonSection">
                    {newUser? "Sign up" : "Sign in"}
                </button>
                <br/>
                <br/>
                <small class="text-danger d-block text-center">{user.error}</small>
                {user.success && (
                    <small>User {newUser? "created" : "logged in"} successfully</small>
                )}
            </form>

            <p class="text-dark d-block text-center">
                {newUser ? "Already have an account?" : "Don't have an account?"}
                <span class="text-primary" style={{cursor:'pointer'}} onClick={()=>setNewUser(!newUser)}>
                    <u>{newUser ? "Log in" : "Create an account"}</u>
                </span>{" "}
            </p>

            <p class="text-center text-bold text-dark pt-2">or</p>

            <button class="btn btn-block btn-dark loginButtonSection" onClick={handleGoogleSignIn}>
                <img src={googleIcon} style={{ width: "25px" }} alt="" />  Continue with Google
            </button>
            <br/>
            <br/>
            <button class="btn btn-block btn-dark loginButtonSection" onClick={handleFacebookSignIn}>
                <img src={fbIcon} style={{ width: "25px" }} alt="" />  Continue with Facebook
            </button>
         </div>
    );
  };

  export default Login;