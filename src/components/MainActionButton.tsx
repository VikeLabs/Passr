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
