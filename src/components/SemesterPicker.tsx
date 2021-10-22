import React from 'react';
import { Semester } from '../api';
import GenericDropdown, { ListButton } from './GenericDropdown';

export interface SemesterPickerProps {
	semesters: Semester[];
	current: number;
	onSelect: (index: number) => void;
	//onAddNew: () => void;
}

function SemesterPicker({
	semesters,
	current,
	onSelect,
	//onAddNew,
	...props
}: SemesterPickerProps) {
	return (
		<GenericDropdown buttonDisplay={'Semester'}>
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
		</GenericDropdown>
	);
}
export default SemesterPicker;
