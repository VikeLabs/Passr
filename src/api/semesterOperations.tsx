import { Semester } from 'api';
import { AddSemesterData } from 'components/AddSemesterModal';

const handleErrors = (response: Response) => {
	if (!response.ok) {
		throw new Error('fetch unsuccessful');
	}
	return response;
};

// create
export const fetchPostSemester = async (data: AddSemesterData) =>
	fetch('/semester/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

// read
export const fetchGetSemester = async (id: string) =>
	fetch(`/semester/${id}`, {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

// update
export const fetchPutSemester = async (change: Partial<Semester>) =>
	fetch('/semester/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

// delete
export const fetchDeleteSemester = async (id: string) =>
	fetch('/semester/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
