import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	const signInWithGoogle = async () => {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		navigate('/');
	};
	return (
		<div>
			<p>Sign in with google to continue</p>
			<button onClick={signInWithGoogle}>Sign in with google</button>
		</div>
	);
};

export default LoginPage;
