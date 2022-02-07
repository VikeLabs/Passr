import { useQuery, useMutation } from 'react-query';
import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';

const handleErrors = (response: Response) => {
	if (!response.ok) {
		throw Error('fetch unsuccessful');
	}
	return response;
};

// create
export const fetchPostCourseItem = async (data: AddItemData) => {
	await fetch('/courseItem/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);
};

// read
export const fetchGetCourseItem = async (id: string) =>
	await fetch(`/courseItem/${id}`, {
		headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
	})
		.then(handleErrors)
		.then((res) => res.json());

// update
export const fetchPutCourseItem = async (change: Partial<CourseItem>) => {
	await fetch('/courseItem/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);
};

// delete
export const fetchDeleteCourseItem = async (id: string) => {
	await fetch('/courseItem/', {
		// append id to end of string
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
};
