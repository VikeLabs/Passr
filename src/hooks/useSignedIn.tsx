import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

export const useSignedIn = () => {
	const [signedIn, setSignedIn] = useState(false);
	const history = useHistory();
	const signOut = () => {
		Auth.signOut();
		setSignedIn(false);
		history.go(0);
	};

	const checkAuthenticated = () => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				setSignedIn(true);
			})
			.catch(() => setSignedIn(false));
	};

	useEffect(() => checkAuthenticated(), []);

	return { signOut, signedIn, checkAuthenticated };
};
