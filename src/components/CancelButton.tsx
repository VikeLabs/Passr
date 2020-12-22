import styled from 'styled-components';
import MainButton from './MainActionButton';

const CancelButton = styled(MainButton)`
	background-color: #e0e0e0;
	color: #002366;
	&:hover {
		background-color: #d0d0d0;
	}
`;

export default CancelButton;
