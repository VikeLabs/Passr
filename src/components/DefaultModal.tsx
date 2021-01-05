import React from 'react';
import styled from 'styled-components';
import MainButton, { Variant } from './MainActionButton';

export const Overlay = styled.div`
	position: absolute;
	backdrop-filter: blur(5px);
	height: 100%;
	width: 100%;
	display: flex;
	// justify-content: center;
	align-items: center;
`;

export const ButtonField = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 'left right';
	grid-gap: 1em;
`;

const ModalContainer = styled.div`
	background-color: #ffffff;
	position: fixed;
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		'header'
		'body'
		'footer';
	border-radius: 30px;
	overflow: auto;
	width: 24em;
	height: auto;
	&:not {
		background-color: red;
	}
`;

const Header = styled.div`
	background-color: #777777;
	display: flex;
	width: 100%;
	height: 3em;
	justify-content: center;
	align-items: center;
	// font-family: Montserrat;
	grid-area: header;
`;

// Footer
const Footer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f8f8f8;
	width: 100%;
	height: 3.5em;
	grid-area: footer;
`;

const ButtonContainer = styled.div`
	margin-right: 2em;
	margin-left: auto;
`;

export interface ModalInterface {
	color?: string;
	children: React.ReactNode;
	header: string | React.ReactNode;
	primaryButton: string;
	primaryVar: Variant;
	secondaryVar: Variant;
	secondaryButton: string;
	handleClose: () => void;
	handlePrimary: () => void;
}

function DefaultModal({
	color,
	header,
	children,
	primaryButton,
	primaryVar,
	secondaryButton,
	secondaryVar,
	handleClose,
	handlePrimary,
}: ModalInterface) {
	return (
		<Overlay onClick={() => handleClose()}>
			<ModalContainer
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Header style={{ backgroundColor: color }}>{header}</Header>
				{children}
				<Footer>
					<ButtonContainer>
						<ButtonField>
							<MainButton
								variant={secondaryVar}
								onClick={handleClose}
							>
								{secondaryButton}
							</MainButton>
							<MainButton
								variant={primaryVar}
								onClick={handlePrimary}
							>
								{primaryButton}
							</MainButton>
						</ButtonField>
					</ButtonContainer>
				</Footer>
			</ModalContainer>
		</Overlay>
	);
}

export default DefaultModal;
