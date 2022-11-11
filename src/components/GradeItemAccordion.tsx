import React, { useState } from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';
import ActionButton from './ActionButton';

import { gradeToString, parseGrade } from '../Utils';
import { CourseItem, Course } from 'api';
import { useDeleteCourseItem } from 'hooks/useCourseItem';
import { useUpdateCourse } from 'hooks/useCourse';

export interface GradeItemAccordionInterface {
	item: CourseItem;
	course: Course;
	updateItem: (item: CourseItem) => void;
}

const Accordion = styled.div`
	background-color: ${({ theme }) => theme.colors.main[0]};
	color: ${({ theme }) => theme.colors.gray[3]};

	display: grid;
	grid-template-columns:
		minmax(5em, 1fr) minmax(10em, 5fr) minmax(10em, 5fr)
		minmax(10em, 5fr) minmax(10em, 5fr);
	grid-template-rows: 6em;
	grid-template-areas: 'arrow item weight grade duedate';
`;
const RowComponent = styled.div`
	font-weight: bold;
	font-size: large;
	border: none;
	padding-right: 1.5em;
	background-color: ${({ theme }) => theme.colors.main[0]};
`;
const DropDownArrow = styled.button`
	border: none;
	outline: none;
	font-size: 2em;
	background-color: ${({ theme }) => theme.colors.main[0]};
`;

const DeleteButton = styled(ActionButton)`
	color: #b80f0a;
	width: auto;
	font-weight: bold;
	margin-top: 0.5em;
	padding-left: 0.5em;
	padding-right: 0.5em;
`;

function GradeItemAccordion({
	item,
	course,
	updateItem,
}: GradeItemAccordionInterface) {
	const { name, weight, grade, dueDate } = item;
	const [expanded, setExpanded] = useState(false);
	const [tempName, setTempName] = useState(name);
	const [tempWeight, setTempWeight] = useState(weight?.toString() || '');
	const [tempGrade, setTempGrade] = useState(gradeToString(grade));
	const [tempDate, setTempDate] = useState('');
	const courseItemDelete = useDeleteCourseItem();
	const courseUpdate = useUpdateCourse();

	function deleteCourseItem(id: string) {
		courseItemDelete.mutate(id, {
			onSuccess: () => {
				// TODO: update course in backend instead
				courseUpdate.mutate({
					id: course.id,
					courseItems: [
						...course.courseItems.filter(
							(oldItem) => oldItem.id != id
						),
					],
				});
			},
		});
	}

	function handleChange(change: Partial<CourseItem>) {
		const newItem = { ...item, ...change };
		updateItem(newItem);
	}

	const extended = () => {
		return (
			<>
				<Accordion
					style={{
						height: '8em',
					}}
				>
					<RowComponent
						style={{
							gridArea: 'arrow',
						}}
					></RowComponent>

					<RowComponent
						style={{
							gridArea: 'item',
						}}
					>
						<TextInput
							value={tempName}
							onChange={(e) => {
								setTempName(e.target.value);
							}}
							onBlur={() => {
								handleChange({ name: tempName });
							}}
							label="Name"
							placeholder="Name"
						/>
						<DeleteButton
							onClick={() => deleteCourseItem(item.id)}
							variant="secondary"
						>
							<i className="fas fa-trash"></i>
							&nbsp; &nbsp;Delete Item
						</DeleteButton>
					</RowComponent>
					<RowComponent
						style={{
							gridArea: 'weight',
						}}
					>
						<TextInput
							value={tempWeight}
							onChange={(e) => {
								setTempWeight(e.target.value);
							}}
							onBlur={() => {
								handleChange({
									weight: isNaN(Number(tempWeight))
										? undefined
										: Number(tempWeight),
								});
							}}
							label="Weight"
							placeholder="Weight"
						/>
					</RowComponent>
					<RowComponent
						style={{
							gridArea: 'grade',
						}}
					>
						<TextInput
							value={tempGrade}
							onChange={(e) => {
								setTempGrade(e.target.value);
							}}
							onBlur={() => {
								const parsedGrade = parseGrade(tempGrade);
								handleChange({ grade: parsedGrade });
							}}
							label="Grade"
							placeholder="Grade"
						/>
					</RowComponent>
					<RowComponent
						style={{
							gridArea: 'duedate',
						}}
					>
						<TextInput
							value={tempDate}
							onChange={(e) => {
								setTempDate(e.target.value);
							}}
							onBlur={() => {
								handleChange({
									dueDate: new Date(tempDate),
								});
							}}
							label="Due Date"
							placeholder="Due Date"
						/>
					</RowComponent>
				</Accordion>
			</>
		);
	};

	return (
		<>
			<Accordion>
				<RowComponent
					style={{
						gridArea: 'arrow',
						textAlign: 'center',
						paddingTop: '28px',
					}}
				>
					<DropDownArrow onClick={() => setExpanded(!expanded)}>
						<i
							className={
								expanded
									? 'fas fa-angle-down'
									: 'fas fa-angle-right'
							}
						/>
					</DropDownArrow>
				</RowComponent>

				<RowComponent
					style={{
						gridArea: 'item',
						paddingTop: '20px',
					}}
				>
					<p>{name}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'weight',
						paddingTop: '20px',
					}}
				>
					<p>{`${weight} %`}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'grade',
						paddingTop: '20px',
					}}
				>
					<p>{gradeToString(grade) || 'N/A'}</p>
				</RowComponent>
				<RowComponent
					style={{
						gridArea: 'duedate',
						paddingTop: '20px',
					}}
				>
					<p>{dueDate?.toLocaleDateString() || 'N/A'}</p>
				</RowComponent>
			</Accordion>
			{expanded && extended()}
			<br></br>
		</>
	);
}

export default GradeItemAccordion;
