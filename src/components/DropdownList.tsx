import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Dropdown.css';

interface DropdownItem {
	path: string;
	cName: string;
	title: string;
	icon?: string;
}
interface Props {
	items: DropdownItem[];
}
// const DropdownMenuClicked = styled.ul`
// 	width: 200px;
// 	position: absolute;
// 	top: 50px;
// 	list-style: none;
// 	text-align: start;
// 	z-index: 2;
// 	border: 1px solid rgba(0, 0, 0, 0.04);
// 	box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
// 	padding: 0;
// 	margin: 0;
// 	border-radius: 10px;
// `;
const DropdownMenuItem = styled.li`
	color: white;
	cursor: pointer;
	list-style: none;
`;
const DropdownLink = styled(Link)`
	display: block;
	height: 100%;
	width: 100%;
	text-decoration: none;
	color: black;
	padding: 16px;
`;
function DropdownList(props: Props) {
	return (
		<ul className={'dropdown-menu'}>
			{props.items.map((item, index) => {
				return (
					<DropdownMenuItem key={index}>
						<DropdownLink className={item.cName} to={item.path}>
							{item.title}
						</DropdownLink>
					</DropdownMenuItem>
				);
			})}
		</ul>
	);
}

export default DropdownList;
