import React from 'react';
import styled, { css } from 'styled-components';
import AddButton from './MainActionButton';
// import Grade from './GradeItemAccordion';
import { Course, CourseItem } from '../api';
import GradeItemAccordion from './GradeItemAccordion';

const ContentContainer = styled.div`
	color: #002366;
	font-weight: bold;
`;

const TitleRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	border-style: hidden hidden solid hidden;
	color: #828282;
`;

const ColumnItemHeader = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	flex-basis: 100%;
	flex: 1;
	color: #002366;
`;

const ButtonColumn = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: initial;
	margin: 1.5em;
	width: 15em;
`;

const AddItemButton = styled(AddButton)`
	margin: 1.5em;
	color: #002366;
`;

const CourseItemRow = styled.div`
	justify-content: center;
	display: flex;
	flex-direction: row;
	max-width: 100%;
	white-space: nowrap;
`;

const Table = styled.table`
	width: 100%;
	color: #828282;
	text-align: left;
	font-weight: normal;
	font-size: small;
	${css`
		td,
		tr,
		th {
			border: none;
		}
	`}
`;

const CourseItemTitleSpace = styled.th`
	padding: 0.25em;
`;

const CourseItemTitle = styled.th`
	padding-top: 1em;
`;

interface Props {
	course: Course;
	updateCourse: (course: Course) => void;
}

function GradeBookContentContainer({ course, updateCourse }: Props) {
	const openModal = () => {
		console.log('Item added!');
	};
	function updateCourseItem(item: CourseItem, index: number) {
		const newCourseItems = [...course.items];
		newCourseItems[index] = item;
		updateCourse({ ...course, items: newCourseItems });

		// Following has been done now...

		// In the future, this will not call the update state function
		// Instead it will determine which course item in the course was updated
		// Then create a new course with the updated item
		// And call a callback function (likely named updateCourse) passed in as a prop
		// With the new course, similar to what is done in the accordion item, just one 'level up'
	}

	return (
		<ContentContainer>
			<TitleRow>
				<ColumnItemHeader>
					<h2>Course Items</h2>
				</ColumnItemHeader>
				<ButtonColumn>
					<AddItemButton onClick={openModal}>
						<p>Add Item</p>
					</AddItemButton>
				</ButtonColumn>
			</TitleRow>
			<CourseItemRow>
				<Table>
					<tr>
						<CourseItemTitleSpace></CourseItemTitleSpace>
						<CourseItemTitle>Item</CourseItemTitle>
						<CourseItemTitle>Weight</CourseItemTitle>
						<CourseItemTitle>Grade</CourseItemTitle>
						<CourseItemTitle>Due Date</CourseItemTitle>
					</tr>
					{course.items.map((item, index) => {
						console.log({ item, index });
						function callback(newItem: CourseItem) {
							updateCourseItem(newItem, index);
						}
						return (
							<GradeItemAccordion
								key={index}
								item={item}
								updateItem={callback}
							/>
						);
					})}
				</Table>
			</CourseItemRow>
		</ContentContainer>
	);
}

export default GradeBookContentContainer;
