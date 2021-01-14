import React from 'react';
import styled from 'styled-components';
import MainButton, { Variant } from './MainActionButton';

export const Overlay = styled.div`
	position: absolute;
	backdrop-filter: blur(5px);
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonField = styled.div`
	margin-right: 1em;
	margin-left: 10.5em;
	width: 100%;
	display: flex;
	justify-content: right;
	grid-gap: 1em;
`;

const ModalContainer = styled.div`
	background-color: #ffffff;
	position: fixed;
	display: flex;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	align-content: space-between;
	border-radius: 30px;
	overflow: auto;
	width: 24em;
	height: auto;
`;

const Header = styled.div<{ headerColor: string }>`
	background-color: ${(props) => props.headerColor};
	display: flex;
	width: 100%;
	height: 2.5em;
	justify-content: center;
	align-items: center;
`;

const Footer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f8f8f8;
	width: 100%;
	height: 3.5em;
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
						<MainButton
							variant={secondaryVariant || 'secondary'}
							onClick={handleClose}
						>
							{secondaryButton}
						</MainButton>
						<MainButton
							variant={primaryVariant || 'primary'}
							onClick={handlePrimary}
						>
							{primaryButton}
						</MainButton>
					</ButtonField>
				</Footer>
			</ModalContainer>
		</Overlay>
	);
}

export default DefaultModal;
