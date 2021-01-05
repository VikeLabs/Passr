import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { inherits } from 'util';

type Variant = 'success' | 'delete';
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
			success: {
				backgroundColor: '#4961e1',
				'&:hover': {
					backgroundColor: '#354bc4',
				},
			},
			delete: {
				backgroundColor: '#b80f0a',
				'&:hover': {
					backgroundColor: '#850c04',
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
			variant={variant || 'success'}
			onClick={onClick}
			{...props}
		>
			{children}
		</MainActionButton>
	);
}

export default MainButton;
