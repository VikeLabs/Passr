import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface DropdownItem {
	path: string;
	title: string;
	icon?: string;
}
interface Props {
	items: DropdownItem[];
}
const DropdownMenu = styled.ul`
	list-style: none;
	background-color: ${({ theme }) => theme.colors.main[0]};
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
		background: ${({ theme }) => theme.colors.main[1]};
		list-style: none;
		border-radius: 10px;
	}
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
function DropdownList(props: Props) {
	return (
		<DropdownMenu>
			{props.items.map((item, index) => {
				return (
					<DropdownMenuItem key={index}>
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
