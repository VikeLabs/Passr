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
	display: inline-block;
	text-decoration: none;
	text-align: center;
	margin: 1em;
	float: right;
	color: ${({ theme }) => theme.colors.text[2]};
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
	& i {
		padding-right: 0.5rem;
	}
`;
const ProfileDropdown = styled(GenericDropdown)`
	display: inline-block;
	float: right;
	// align-items: left;
	margin-right: 0;
`;

function Profile() {
	const { signedIn, signOut } = useSignedIn();
	return (
		<>
			{!signedIn ? (
				<SignInLink to="/sign-in">
					<i className="fas fa-sign-in-alt" />
					{'Sign in'}
				</SignInLink>
			) : (
				<ProfileDropdown
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
				</ProfileDropdown>
			)}
		</>
	);
}

export default Profile;
