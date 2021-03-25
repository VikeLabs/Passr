import React from 'react';
import styled from 'styled-components';
import AddButton from './MainActionButton';
import { Course, CourseItem } from '../api';
import GradeItemAccordion from './GradeItemAccordion';

const ContentContainer = styled.div`
	color: ${(props) => props.theme.colors.text[1]};
	font-weight: bold;
	padding: 3em 0em 3em 3em;

	display: grid;
	grid-template-columns:
		minmax(3em, 1fr) minmax(6em, 5fr) minmax(6em, 5fr)
		minmax(6em, 5fr) minmax(6em, 5fr);
	grid-template-rows: 5em 4em;
	grid-template-areas:
		'columnItemHeader columnItemHeader columnItemHeader columnItemHeader buttonColumn'
		'courseTitleSpace courseItemTitle courseWeightTitle courseGradeTitle courseDuedateTitle'
		'gradeItemAccordian gradeItemAccordian gradeItemAccordian gradeItemAccordian gradeItemAccordian';
`;

const ColumnItemHeader = styled.div`
	grid-area: columnItemHeader;
	color: ${(props) => props.theme.colors.text[1]};

	border: 1px solid ${(props) => props.theme.colors.gray[3]};
	border-style: none none solid none;
`;

const CourseItemRow = styled.div`
	grid-area: gradeItemAccordian;
	color: ${(props) => props.theme.colors.text[1]};
`;

const ButtonColumn = styled.div`
	grid-area: buttonColumn;
	text-align: right;

	border: 1px solid ${(props) => props.theme.colors.gray[3]};
	border-style: none none solid none;
`;

const AddItemButton = styled(AddButton)`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	box-shadow: 0px 8px 16px rgba(0, 126, 255, 0.16);

	margin-top: 1em;
	padding-top: 0.3em;
	width: 10em;
	height: 3.5em;
	letter-spacing: 1px;
`;

const CourseItemTitleSpace = styled.div`
	grid-area: 'courseTitleSpace';
`;

const CourseItemTitle = styled.div`
	padding-top: 1em;

	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.gray[3]};
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
			<ColumnItemHeader>
				<h2>Course Items</h2>
			</ColumnItemHeader>
			<ButtonColumn>
				<AddItemButton onClick={openModal} variant="primary">
					<p>Add Item</p>
				</AddItemButton>
			</ButtonColumn>

			<CourseItemTitleSpace></CourseItemTitleSpace>
			<CourseItemTitle style={{ gridArea: 'courseItemTitle' }}>
				Item
			</CourseItemTitle>
			<CourseItemTitle style={{ gridArea: 'courseWeightTitle' }}>
				Weight
			</CourseItemTitle>
			<CourseItemTitle style={{ gridArea: 'courseGradeTitle' }}>
				Grade
			</CourseItemTitle>
			<CourseItemTitle style={{ gridArea: 'courseDuedateTitle' }}>
				Due Date
			</CourseItemTitle>

			<CourseItemRow>
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
			</CourseItemRow>
		</ContentContainer>
	);
}

export default GradeBookContentContainer;
