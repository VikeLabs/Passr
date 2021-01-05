import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Dropdown.css';

export interface DropdownItem {
	path: string;
	cName: string;
	title: string;
	icon?: string;
}
interface Props {
	items: DropdownItem[];
}
const DropdownMenu = styled.ul`
	list-style: none;
	text-align: start;
	z-index: 2;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
	padding: 0;
	margin: 0;
	border-radius: 10px;
`;
const DropdownMenuItem = styled.li`
	color: white;
	cursor: pointer;
	list-style: none;
	&:hover {
		background: #ededed;
		list-style: none;
		border-radius: 10px;
	}
`;
const DropdownLink = styled(Link)`
	display: block;
	height: 100%;
	text-decoration: none;
	color: black;
	padding: 1em;
	&:hover {
		color: #4961e1;
	}
`;
function DropdownList(props: Props) {
	return (
		<DropdownMenu>
			{props.items.map((item, index) => {
				return (
					<DropdownMenuItem key={index}>
						<DropdownLink className={item.cName} to={item.path}>
							{item.title}
						</DropdownLink>
					</DropdownMenuItem>
				);
			})}
		</DropdownMenu>
	);
}

export default DropdownList;
