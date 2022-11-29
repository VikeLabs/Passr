import styled from 'styled-components';

const Title = styled.h2`
	grid-area: title;
`;

const Card = styled.div`
	display: block;
	border-radius: 25px;
	background-color: ${(props) => props.theme.colors.main[0]};
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	min-height: 100px;
	height: 100%;
`;

export { Title, Card };
