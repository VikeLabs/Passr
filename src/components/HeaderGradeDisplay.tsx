import React from 'react';
import styled from 'styled-components';

export interface Props {
	label: string;
	grade: string;
}
const HeaderDisplayContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const Label = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.xs};
	color: ${({ theme }) => theme.colors.primary[0]};
	width: 17em;
	margin: 0;
	margin-bottom: 0.5em;
`;
const HeaderGradeDisplayContainer = styled.div`
	background-color: ${({ theme }) => theme.colors.main[0]};
	width: 15em;
`;
const GradeDisplayText = styled.h2`
	color: ${({ theme }) => theme.colors.gray[3]};
	padding-left: 1em;
`;
function OpenInfo() {
	console.log('opened!');
}
function HeaderGradeDisplay({ label, grade, ...props }: Props) {
	return (
		<HeaderDisplayContainer {...props}>
			<Label>{label}</Label>
			<HeaderGradeDisplayContainer onClick={OpenInfo}>
				{grade == '' && <GradeDisplayText>N/A</GradeDisplayText>}
				{grade != '' && <GradeDisplayText>{grade}%</GradeDisplayText>}
			</HeaderGradeDisplayContainer>
		</HeaderDisplayContainer>
	);
}

export default HeaderGradeDisplay;
