import React from 'react';
import styled from 'styled-components';
import MainButton, { Variant } from './MainActionButton';

export const Overlay = styled.div`
	position: absolute;
	backdrop-filter: blur(5px);
	background-color: rgba(10, 10, 20, 0.5);
	backdrop-filter: blur(0.2em);
	height: 100%;
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
	grid-gap: 1em;
`;

export const AbortButton = styled(MainButton)`
	grid-area: abort;
`;

export const ProceedButton = styled(MainButton)`
	grid-area: proceed;
`;

const ModalContainer = styled.div`
	background-color: #ffffff;
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
	background-color: ${(props) => props.headerColor};
	color: white;
	display: flex;
	width: 100%;
	height: 3em;
	justify-content: center;
	align-items: center;
	font-size: 1.2em;
`;

const Footer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f8f8f8;
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
	headerColor = '#777777',
	header,
	children,
	primaryButton,
	primaryVariant,
	secondaryButton,
	secondaryVariant,
	handleClose,
	handlePrimary,
}: ModalInterface) {
	return (
		<Overlay onClick={handleClose}>
			<ModalContainer
				onClick={(e) => {
					e.stopPropagation(); // Prevents modal from closing on click
				}}
			>
				<Header headerColor={headerColor}>{header}</Header>
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
