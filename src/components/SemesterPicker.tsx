import React from 'react';
import styled from 'styled-components';
import { buttonStyle } from 'styled-system';
import { Semester } from '../api';
import GenericDropdown, { ListButton } from './GenericDropdown';

export interface SemesterPickerProps {
	semesters: Semester[];
	current: number;
	onSelect: (index: number) => void;
}
const Dropdown = styled(GenericDropdown)`
	button {
		font-size: ${({ theme }) => theme.fontSizes.s};
		border-radius: 12px;
		padding: 0.5rem 2rem;
		width: 100%;
		border: none;
		outline: none;
		box-shadow: none;
		${buttonStyle}
		:disabled {
			background-color: #c2c2c2;
			color: #4d4d4d;
		}
		color: ${({ theme }) => theme.colors.text[1]};
	}
`;
function SemesterPicker({ semesters, current, onSelect }: SemesterPickerProps) {
	return (
		<Dropdown buttonDisplay={semesters[current].name}>
			{semesters.map((item, name) => {
				return (
					<ListButton
						key={name}
						onClick={() => onSelect(semesters.indexOf(item))}
					>
						{item.name}
					</ListButton>
				);
			})}
		</Dropdown>
	);
}
export default SemesterPicker;
