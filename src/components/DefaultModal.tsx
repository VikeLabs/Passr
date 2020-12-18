import React, { useState } from 'react';
import styled from 'styled-components';

// const Overlay = styled.div`
// 	position: absolute;
// 	backdrop-filter: blur(5px);
// 	height: 100%;
// 	width: 100%;
// 	display: flex;
// 	// justify-content: center;
// 	align-items: center;

// 	&.closed {
// 		display: none;
// 	}
// `;

const ModalContainer = styled.div`
	background-color: #ffffff;
	position: fixed;
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		'header'
		'body'
		'footer';
	border-radius: 6%;
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
	header: string;
	footer: React.ReactNode;
	// closed: boolean;
}

function DefaultModal({ color, header, children, footer }: ModalInterface) {
	// const [isOpen, setStatus] = useState('');

	return (
		// <Overlay onClick={() => setStatus('closed')} className={isOpen}>
		<ModalContainer
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<Header style={{ backgroundColor: color }}>{header}</Header>
			{children}
			<Footer>
				<ButtonContainer>{footer}</ButtonContainer>
			</Footer>
		</ModalContainer>
		// </Overlay>
	);
}

export default DefaultModal;
