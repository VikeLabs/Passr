import React from 'react';
import GenericDropdown, {
	ListLink,
	ListButton,
} from '../components/GenericDropdown';
import styled from 'styled-components';
import { useSignedIn } from 'hooks/useSignedIn';

const Button = styled.div`
	padding: 1em;
`;

function ProfileDropdown() {
	const { signedIn, signOut } = useSignedIn();
	return (
		<GenericDropdown
			buttonDisplay={
				<Button>
					{'"Name of User"  '}
					<i className="fas fa-user-circle" />
				</Button>
			}
		>
			<ListLink to="/profile">
				<i className="fas fa-user-circle" />
				{'Profile'}
			</ListLink>
			<ListLink to="/settings">
				<i className="fas fa-cog" />
				{'Settings'}
			</ListLink>
			{(signedIn && (
				<ListButton onClick={signOut}>
					<i className="fas fa-sign-out-alt" /> {'Sign Out'}
				</ListButton>
			)) || (
				<ListLink to="/sign-in">
					<i className="fas fa-sign-in-alt" />
					{'Sign in'}
				</ListLink>
			)}
		</GenericDropdown>
	);
}

export default ProfileDropdown;
