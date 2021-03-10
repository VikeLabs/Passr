import React, { useState } from 'react';
import Logo from 'molecules/Logo';
import TextButton from 'components/TextButton';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ErrorPageContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	font-size: ${({ theme }) => theme.fontSizes.xl};
	color: ${({ theme }) => theme.colors.text[2]};
`;

const LogoContainer = styled.div`
	max-width: 50em;
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-gap: 1em;
`;

const ErrorMessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: left;
	padding: 1em 3em 1em;
`;

const GradeBookLink = styled(TextButton)`
	padding-top: 0.5em;
	text-decoration: underline;
	&:hover {
		color: ${({ theme }) => theme.colors.text[1]};
		cursor: pointer;
	}
`;

function ErrorPage() {
	const history = useHistory();
	const BackToHomePage = () => {
		history.push('/');
	};
	return (
		<ErrorPageContainer>
			<LogoContainer>
				<Logo width="10em" height="10em" />
			</LogoContainer>
			<ErrorMessageContainer>
				<h6>Sorry, this page does not exist!</h6>
				<GradeBookLink
					text="Bring me back to safety"
					onClick={BackToHomePage}
				/>
			</ErrorMessageContainer>
		</ErrorPageContainer>
	);
}

export default ErrorPage;
