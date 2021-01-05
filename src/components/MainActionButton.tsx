import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

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
}

// const MainActionButton = styled.button`
// 	// background-color: #4961e1;
// 	color: white;
// 	font-size: 1em;
// 	border-radius: 6px;
// 	padding: 0.5rem 2rem;
// 	width: 100%;
// 	border: none;
// 	&:hover {
// 		background-color: #354bc4;
// 	},
// 	variant({
// 		variants: {
// 			success: {
// 				background-color: #4961e1;
// 				&:hover {
// 					background-color: #354bc4;
// 				}
// 			}
// 			delete: {
// 				background-color: #b80f0a;
// 				&:hover {
// 					background-color: #850c04;
// 				}
// 			}
// 		}
// 	})
// `;

const MainActionButton = styled('button')<{ variant: Variant }>(
	{
		color: 'white',
		fontSize: '1em',
		borderRadius: '6px',
		padding: '0.5rem 2rem',
		width: '100%',
		border: 'none',
	},
	variant({
		variants: {
			primary: {
				backgroundColor: '#4961e1',
				color: '#FFFFFF',
				'&:hover': {
					backgroundColor: '#354bc4',
				},
			},
			secondary: {
				backgroundColor: '#FFFFFF',
				color: '#002366',
				'&:hover': {
					backgroundColor: '#E5F2FC',
				},
			},
			positive: {
				backgroundColor: '#35BEA0',
				color: '#FFFFFF',
				'&:hover': {
					backgroundColor: '#2A967E',
				},
			},
			negative: {
				backgroundColor: '#b80f0a',
				color: '#FFFFFF',
				'&:hover': {
					backgroundColor: '#880B07',
				},
			},
			alternate: {
				backgroundColor: '#e0e0e0',
				color: '#002366',
				'&:hover': {
					backgroundColor: '#d0d0d0',
				},
			},
		},
	})
);

function MainButton({
	children,
	onClick,
	variant,
	...props
}: mainActionButtonInterface) {
	return (
		<MainActionButton
			variant={variant || 'primary'}
			onClick={onClick}
			{...props}
		>
			{children}
		</MainActionButton>
	);
}

export default MainButton;
