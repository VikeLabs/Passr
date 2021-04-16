import React, { useState, useEffect, RefObject } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface DropdownItem {
	path: string;
	title: string;
	icon?: string;
}
interface Props {
	items: DropdownItem[];
	buttonRef: RefObject<HTMLElement>;
	isComponentVisible: boolean;
}
const DropdownMenu = styled.ul<{ isComponentVisible: boolean }>`
	list-style: none;
	background-color: ${({ theme }) => theme.colors.main[0]};
	text-align: start;
	z-index: 2;
	position: absolute;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
	padding: 0;
	margin: 0;
	border-radius: 0 0 10px 10px;
	visibility: ${({ isComponentVisible }) =>
		!isComponentVisible ? 'hidden' : 'visible'};
	transform: ${({ isComponentVisible }) =>
		!isComponentVisible ? 'scaleY(0)' : 'scaleY(1)'};
	transition: visibility 200ms, transform 200ms;
	transform-origin: top;
`;
const DropdownMenuItem = styled.li<{ isComponentVisible: boolean }>`
	color: white;
	cursor: pointer;
	list-style: none;
	&:hover {
		background: ${({ theme }) => theme.colors.main[1]};
		list-style: none;
		border-radius: 10px;
	}
	opacity: ${({ isComponentVisible }) =>
		!isComponentVisible ? '0%' : '100%'};
	transition: opacity 200ms;
`;
const DropdownLink = styled(Link)`
	display: block;
	height: 100%;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.text[2]};
	padding: 1em;
	&:hover {
		color: ${({ theme }) => theme.colors.primary[0]};
	}
`;
function DropdownList({ items, buttonRef, isComponentVisible }: Props) {
	const [top, setTop] = useState(-9999);

	useEffect(() => {
		if (buttonRef.current != null) {
			const rect = buttonRef.current.getBoundingClientRect();
			setTop(rect.bottom);
		}
	}, [buttonRef]);

	return (
		<DropdownMenu
			isComponentVisible={isComponentVisible}
			style={{ top: `${top}px` }}
		>
			{items.map((item, index) => {
				return (
					<DropdownMenuItem
						key={index}
						isComponentVisible={isComponentVisible}
					>
						<DropdownLink to={item.path}>
							<i className={item.icon} />
							{item.title}
						</DropdownLink>
					</DropdownMenuItem>
				);
			})}
		</DropdownMenu>
	);
}

export default DropdownList;
