import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import MainButton, { Variant } from './MainActionButton';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	backdrop-filter: blur(5px);
	background-color: rgba(10, 10, 20, 0.5);
	backdrop-filter: blur(0.2em);
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonField = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 0.25fr;
	grid-template-areas: '. abort proceed .';
	width: 100%;
	height: 60%;
	grid-gap: 1em;
`;

export const AbortButton = styled(MainButton)`
	grid-area: abort;
`;

export const ProceedButton = styled(MainButton)`
	grid-area: proceed;
`;

const ModalContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.main[0]};
	position: fixed;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-content: space-between;
	border-radius: 30px;
	overflow: auto;
	width: 30em;
	height: auto;
`;

const Header = styled.div<{ headerColor: string }>`
	background-color: ${({ headerColor }) => headerColor};
	color: ${({ theme }) => theme.colors.text[0]};
	display: flex;
	width: 100%;
	height: 3em;
	justify-content: center;
	align-items: center;
	font-size: ${({ theme }) => theme.fontSizes.m};
`;

const Footer = styled.div`
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.main[1]};
	width: 100%;
	height: 4.2em;
`;

export interface ModalInterface {
	headerColor?: string;
	children: React.ReactNode;
	header: string | React.ReactNode;
	primaryButton: string;
	secondaryButton: string;
	primaryVariant?: Variant;
	secondaryVariant?: Variant;
	handleClose: () => void;
	handlePrimary: () => void;
}

function DefaultModal({
	headerColor,
	header,
	children,
	primaryButton,
	primaryVariant,
	secondaryButton,
	secondaryVariant,
	handleClose,
	handlePrimary,
}: ModalInterface) {
	const theme = useContext(ThemeContext);
	return (
		<Overlay onClick={handleClose}>
			<ModalContainer
				onClick={(e) => {
					e.stopPropagation(); // Prevents modal from closing on click
				}}
			>
				<Header headerColor={headerColor || theme.colors.gray[1]}>
					{header}
				</Header>
				{children}
				<Footer>
					<ButtonField>
						<AbortButton
							variant={secondaryVariant || 'secondary'}
							onClick={handleClose}
						>
							{secondaryButton}
						</AbortButton>
						<ProceedButton
							variant={primaryVariant || 'primary'}
							onClick={handlePrimary}
						>
							{primaryButton}
						</ProceedButton>
					</ButtonField>
				</Footer>
			</ModalContainer>
		</Overlay>
	);
}

export default DefaultModal;
