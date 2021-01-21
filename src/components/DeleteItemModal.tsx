import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import DefaultModal from './DefaultModal';
import Logo from '../molecules/Logo';

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Desc = styled.p`
	font-size: 0.8em;
	text-align: center;
`;

const BodyLogo = styled(Logo)`
	margin: 1em;
`;

export interface DeleteItemInterface {
	handleDelete: () => void;
	handleClose: () => void;
}

// const red = (props) => props.theme.colors.negative[0];

function DeleteItemModal({ handleDelete, handleClose }: DeleteItemInterface) {
	function onDelete() {
		handleDelete();
		handleClose();
	}

	const theme = useContext(ThemeContext);

	return (
		<DefaultModal
			headerColor={theme.colors.negative[0]}
			handleClose={handleClose}
			header="Are you sure?"
			primaryVariant="negative"
			secondaryVariant="alternate"
			primaryButton="Delete"
			secondaryButton="Cancel"
			handlePrimary={onDelete}
		>
			<Body>
				<Desc>
					This action cannot be undone. Are you sure you want to
					delete this course item?
				</Desc>
				<BodyLogo height="8em" width="100%" />
			</Body>
		</DefaultModal>
	);
}

export default DeleteItemModal;
