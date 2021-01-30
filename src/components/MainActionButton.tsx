import React from 'react';
import styled from 'styled-components';
import { buttonStyle } from 'styled-system';

export type Variant =
	| 'primary'
	| 'secondary'
	| 'positive'
	| 'negative'
	| 'alternate'
	| 'disabled';

export interface MainActionButtonInterface {
	children: React.ReactNode;
	onClick: () => void;
	variant?: Variant;
	disabled?: boolean;
}

const MainActionButton = styled('button')`
	font-size: ${({ theme }) => theme.fontSizes.s};
	border-radius: 12px;
	padding: 0.5rem 2rem;
	width: 100%;
	border: none;
	outline: none;
	box-shadow: none;
	${buttonStyle}
`;

function MainButton({
	children,
	onClick,
	disabled = false,
	...props
}: MainActionButtonInterface) {
	return (
		<MainActionButton onClick={onClick} {...props} disabled={disabled}>
			{children}
		</MainActionButton>
	);
}

export default MainButton;
