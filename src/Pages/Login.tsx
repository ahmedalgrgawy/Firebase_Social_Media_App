// import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();

    const signInWithGoggle = async () => {
        const result = signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <div>
            <p>Sign In With Google</p>
            <button onClick={signInWithGoggle}>Sign In With Google</button>
        </div>

    )
}