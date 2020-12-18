import styled from 'styled-components';
import MainButton from './MainActionButton';

// export interface CancelButtonInterface {
// 	children: React.ReactNode;
// 	onClick: () => void;
// }

const MainCancelButton = styled(MainButton)`
	background-color: #e0e0e0;
	color: #002366;
	&:hover {
		background-color: #d0d0d0;
	}
`;

// function CancelButton({ children, onClick }: mainActionButtonInterface) {
// 	return <MainCancelButton onClick={onClick}>{children}</MainCancelButton>;
// }

export default MainCancelButton;
