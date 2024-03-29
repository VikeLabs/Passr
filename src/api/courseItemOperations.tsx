import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';
import { handleErrors } from './utils';

export const createCourseItem = async (data: AddItemData) =>
	fetch('/courseItem/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	})
		.then(handleErrors)
		.then((res) => res.json());

export const getCourseItem = async (id: string) =>
	fetch(`/courseItem/${id}`, {
		headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
	})
		.then(handleErrors)
		.then((res) => res.json());

export const updateCourseItem = async (change: Partial<CourseItem>) =>
	fetch('/courseItem/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	})
		.then(handleErrors)
		.then((res) => res.json());

export const deleteCourseItem = async (id: string) =>
	fetch('/courseItem/', {
		// append id to end of string
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
