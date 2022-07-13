import React, { useState } from 'react';
import styled from 'styled-components';

import ActionButton from './ActionButton';
import GradeItemAccordion from './GradeItemAccordion';
import AddItemModal, { AddItemData } from './AddItemModal';

import { Course, CourseItem } from '../api';
import { useUpdateCourse } from 'hooks/useCourse';
import {
	useCreateCourseItem,
	useUpdateCourseItem,
} from '../hooks/useCourseItem';

const ContentContainer = styled.div`
	color: ${(props) => props.theme.colors.text[1]};
	font-weight: bold;

	display: grid;
	grid-template-columns:
		minmax(5em, 1fr) minmax(10em, 5fr) minmax(10em, 5fr)
		minmax(10em, 5fr) minmax(10em, 5fr);
	grid-template-rows: 5em 4em;
	grid-template-areas:
		'columnItemHeader columnItemHeader columnItemHeader columnItemHeader buttonColumn'
		'courseTitleSpace courseItemTitle courseWeightTitle courseGradeTitle courseDuedateTitle'
		'gradeItemAccordian gradeItemAccordian gradeItemAccordian gradeItemAccordian gradeItemAccordian';
`;

const ColumnItemHeader = styled.div`
	grid-area: columnItemHeader;
	color: ${(props) => props.theme.colors.text[1]};

	border: 1px solid ${(props) => props.theme.colors.gray[2]};
	border-style: none none solid none;
`;

const CourseItemRow = styled.div`
	grid-area: gradeItemAccordian;
	color: ${(props) => props.theme.colors.text[1]};
`;

const ButtonColumn = styled.div`
	grid-area: buttonColumn;
	text-align: right;

	border: 1px solid ${(props) => props.theme.colors.gray[2]};
	border-style: none none solid none;
`;

const AddItemButton = styled(ActionButton)`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	box-shadow: 0px 8px 16px rgba(0, 126, 255, 0.16);

	margin-top: 1em;
	margin-right: 2em;
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
	color: ${({ theme }) => theme.colors.gray[2]};
`;

interface Props {
	course: Course;
}

function GradeBookContentContainer({ course }: Props) {
	const [modalOpen, setModalOpen] = useState(false);
	const courseItemCreate = useCreateCourseItem();
	const courseItemUpdate = useUpdateCourseItem();
	const courseUpdate = useUpdateCourse();

	async function handleItemSubmit(data: AddItemData) {
		console.log('data', data);
		const courseItem = await courseItemCreate.mutateAsync(data);
		console.log('after mutation', courseItem);

		courseUpdate.mutate({
			id: course.id,
			courseItems: [...course.courseItems, courseItem],
		});
	}

	const handleModalClose = () => {
		setModalOpen(false);
	};
	function openModal() {
		setModalOpen(true);
	}

	function updateCourseItem(item: Partial<CourseItem>, index: number) {
		courseItemUpdate.mutate({ ...item, id: course.courseItems[index].id });
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
				{course.courseItems.map((item, index) => {
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
			{modalOpen && (
				<AddItemModal
					handleSubmit={handleItemSubmit}
					handleClose={handleModalClose}
				/>
			)}
		</ContentContainer>
	);
}

export default GradeBookContentContainer;
