import React from 'react';
import GenericDropdown, {
	ListLink,
	ListButton,
} from '../components/GenericDropdown';
import styled from 'styled-components';
import { useSignedIn } from 'hooks/useSignedIn';
import { Link } from 'react-router-dom';

const Button = styled.div`
	padding: 1rem;
`;

const SignInLink = styled(Link)`
	display: block;
	text-decoration: none;
	padding: 1em;
	color: ${({ theme }) => theme.colors.text[2]};
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;

function ProfileDropdown() {
	const { signedIn, signOut } = useSignedIn();
	return (
		<>
			{signedIn ? (
				<GenericDropdown
					buttonDisplay={
						<Button>
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
					<ListButton onClick={signOut}>
						<i className="fas fa-sign-out-alt" /> {'Sign Out'}
					</ListButton>
				</GenericDropdown>
			) : (
				<SignInLink to="/sign-in">
					<i className="fas fa-sign-in-alt" />
					{'Sign in'}
				</SignInLink>
			)}
		</>
	);
}

export default ProfileDropdown;
