import { Semester } from 'api';
import { AddSemesterData } from 'components/AddSemesterModal';
import { handleErrors } from './utils';

export const createSemester = async (data: AddSemesterData) =>
	fetch('/semester/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

export const getSemester = async (id: string) =>
	fetch(`/semester/${id}`, {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

export const updateSemester = async (change: Partial<Semester>) =>
	fetch('/semester/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

export const deleteSemester = async (id: string) =>
	fetch('/semester/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
