import React from 'react';
import styled from 'styled-components';
import AddButton from './MainActionButton';

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
	text-decoration: underline;
	font-weight: normal;
	font-size: small;
`;

const CourseItemTitleSpace = styled.th`
	padding: 0.25em;
`;

const CourseItemTitle = styled.th`
	padding: 1em;
`;

function GradeBookContentContainer() {
	const openModal = () => {
		console.log('Item added!');
	};
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
				</Table>
			</CourseItemRow>
		</ContentContainer>
	);
}

export default GradeBookContentContainer;
