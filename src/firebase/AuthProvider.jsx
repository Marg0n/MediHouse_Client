import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {


    // get the user
    const [user, setUser] = useState(null);

    // loading
    const [loading, setLoading] = useState(true);
    // console.log(loading)
    // console.log("user ase?", user)

    // social auth Providers
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    // create a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login the user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    // Google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    // GitHub login
    const gitHubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider)
    };

    // Update user Profile
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    };

    // Reset Password
    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // logout onauthstatechange
    const loggedOut = async () => {
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_SERVER}/logout`, { withCredentials: true });
        setUser(null);
        setLoading(false);
        return signOut(auth);
    };

    // Get token from server
    const getToken = async email => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        )
        console.log(data)
        return data
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);
            //token get
            if (currentUser) {
                getToken(currentUser.email)
            }
            setLoading(false);
        });

        // cleanup function
        return () => {
            return unsubscribe();
        }
    }, []);

    const allValues = {
        createUser,
        signInUser,
        googleLogin,
        gitHubLogin,
        loggedOut,
        user,
        loading,
        setLoading,
        updateUserProfile,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;