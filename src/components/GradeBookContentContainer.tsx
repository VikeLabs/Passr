import React from 'react';
import styled from 'styled-components';
import AddButton from './MainActionButton';
import { Course, CourseItem } from '../api';
import GradeItemAccordion from './GradeItemAccordion';

const ContentContainer = styled.div`
	color: ${(props) => props.theme.colors.text[1]};
	font-weight: bold;
`;

const TitleRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	border-style: hidden hidden solid hidden;
	color: ${(props) => props.theme.colors.gray[1]};
`;

const ColumnItemHeader = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	flex-basis: 100%;
	flex: 1;
	color: ${(props) => props.theme.colors.text[1]};
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
	color: ${(props) => props.theme.colors.text[1]};
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
	color: ${(props) => props.theme.colors.gray[1]};
	text-align: left;
	font-weight: normal;
	font-size: ${({ theme }) => theme.fontSizes.s};
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
						return (
							<GradeItemAccordion
								key={index}
								item={item}
								updateItem={(newItem) =>
									updateCourseItem(newItem, index)
								}
							/>
						);
					})}
				</Table>
			</CourseItemRow>
		</ContentContainer>
	);
}

export default GradeBookContentContainer;
