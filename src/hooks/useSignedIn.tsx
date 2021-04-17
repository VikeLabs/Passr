import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

interface SignInContext {
	signedIn: boolean;
	signOut: () => void;
	signIn: () => void;
}

const signInContext = React.createContext<SignInContext>({
	signedIn: false,
	signOut: () => 0,
	signIn: () => 0,
});

export const useSignedIn = () => {
	const [signedIn, setSignedIn] = useState(false);

	const signOut = () => {
		Auth.signOut();
		setSignedIn(false);
	};

	const checkAuthenticated = () => {
		Auth.currentAuthenticatedUser()
			.then((user) => {
				console.log(user);
				setSignedIn(true);
			})
			.catch(() => setSignedIn(false));
	};

	useEffect(() => checkAuthenticated(), []);

	return { signOut, signedIn, checkAuthenticated };
};
