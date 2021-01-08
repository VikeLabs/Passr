import React from 'react';
import styled from 'styled-components';
import DefaultModal from './DefaultModal';
import Logo from '../molecules/Logo';

const Desc = styled.p`
	color: black;
	font-size: 14px;
`;

const BodyLogo = styled.div`
	justify-content: center;
	align-items: center;
`;

export interface DeleteItemInterface {
	handleDelete: () => void;
	handleClose: () => void;
}

function DeleteItemModal({ handleDelete, handleClose }: DeleteItemInterface) {
	function onDelete() {
		handleDelete();
		handleClose();
	}

	return (
		<DefaultModal
			color="#B80F0A"
			handleClose={handleClose}
			header="Are you sure?"
			primaryButton="Delete"
			primaryVar="negative"
			secondaryButton="Cancel"
			secondaryVar="alternate"
			handlePrimary={onDelete}
		>
			<div>
				<Desc>
					This action cannot be undone, are you sure you want to
					delete this course item?
				</Desc>
				<BodyLogo>
					<Logo height="9em" width="9em" />
				</BodyLogo>
			</div>
		</DefaultModal>
	);
}

export default DeleteItemModal;
