import React from 'react';
import styled from 'styled-components';
import { variant, buttonStyle } from 'styled-system';

export type Variant =
	| 'primary'
	| 'secondary'
	| 'positive'
	| 'negative'
	| 'alternate';

export interface mainActionButtonInterface {
	children: React.ReactNode;
	onClick: () => void;
	variant?: Variant;
	disabled?: boolean;
}

// const MainActionButton = styled('button')<{ variant: Variant }>(
// 	{
// 		color: 'white',
// 		fontSize: '1em',
// 		borderRadius: '6px',
// 		padding: '0.5rem 2rem',
// 		width: '100%',
// 		border: 'none',
// 	},
// 	variant({
// 		variants: {
// 			primary: {
// 				backgroundColor: 'primary',
// 				color: '#FFFFFF',
// 				'&:hover': {
// 					backgroundColor: '#354bc4',
// 				},
// 			},
// 			secondary: {
// 				backgroundColor: '#FFFFFF',
// 				color: '#002366',
// 				'&:hover': {
// 					backgroundColor: '#E5F2FC',
// 				},
// 			},
// 			positive: {
// 				backgroundColor: '#35BEA0',
// 				color: '#FFFFFF',
// 				'&:hover': {
// 					backgroundColor: '#2A967E',
// 				},
// 			},
// 			negative: {
// 				backgroundColor: '#b80f0a',
// 				color: '#FFFFFF',
// 				'&:hover': {
// 					backgroundColor: '#880B07',
// 				},
// 			},
// 			alternate: {
// 				backgroundColor: '#e0e0e0',
// 				color: '#002366',
// 				'&:hover': {
// 					backgroundColor: '#d0d0d0',
// 				},
// 			},
// 		},
// 	})
// );

// const MainActionButton = styled('button')(
// 	{
// 		fontSize: '1em',
// 		borderRadius: '6px',
// 		padding: '0.5rem 2rem',
// 		width: '100%',
// 		border: 'none',
// 	},
// 	buttonStyle
// 	// background-color: ${({ theme }) => theme.colors.primary[0]};
// );

const MainActionButton = styled('button')`
	font-size: 1em;
	border-radius: 12px;
	padding: 0.5rem 2rem;
	width: 100%;
	border: none;
	${buttonStyle}
`;

function MainButton({
	children,
	onClick,
	variant,
	disabled = false,
	...props
}: mainActionButtonInterface) {
	return (
		<MainActionButton
			variant={variant || 'primary'}
			onClick={onClick}
			{...props}
			disabled={disabled}
		>
			{children}
		</MainActionButton>
	);
}

export default MainButton;
