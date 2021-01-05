import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultModal, { Overlay, ButtonField } from './DefaultModal';
import Logo from '../molecules/Logo';
import CancelButton from './CancelButton';
import DeleteButton from './DeleteButton';

const Desc = styled.p`
	color: black;
	font-size: 14px;
`;

const BodyLogo = styled.div`
	justify-content: center;
	align-items: center;
`;

const Cancel = styled(CancelButton)`
	grid-area: right;
`;

const Delete = styled(DeleteButton)`
	grid-area: left;
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
			footer={
				<ButtonField>
					<Cancel
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Cancel>
					<Delete onClick={() => onDelete()}>Delete</Delete>
				</ButtonField>
			}
			primaryButton="Delete"
			secondaryButton="Cancel"
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
