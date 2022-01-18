import { useQuery, useMutation } from 'react-query';
import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';

// create
const fetchPostCourseItem = async (data: AddItemData) => {
	await fetch('/courseItem/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	});
};

export const createCourseItem = () =>
	useMutation((data: AddItemData) => fetchPostCourseItem(data));

// read
const fetchGetCourseItem = async (id: string) =>
	await fetch('/courseItem/' + id, {
		headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
	}).then((res) => res.json());

export const readCourseItem = (id: string) =>
	useQuery('courseItem', () => fetchGetCourseItem(id));

// update
const fetchPutCourseItem = async (change: Partial<CourseItem>) => {
	await fetch('/courseItem/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	});
};

export const updateCourseItem = () =>
	useMutation((data: Partial<CourseItem>) => fetchPutCourseItem(data));

// delete
export const fetchDeleteCourseItem = async (id: string) => {
	await fetch('/courseItem/', {
		// append id to end of string
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	});
};

export const deleteCourseItem = (id: string) =>
	useMutation(() => fetchDeleteCourseItem(id));
