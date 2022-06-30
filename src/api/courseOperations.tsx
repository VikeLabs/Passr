import { Course } from 'api';
import { AddCourseData } from 'components/AddCourseModal';
import { handleErrors } from './utils';

export const createCourse = async (data: AddCourseData) =>
	fetch('/course/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

export const getCourse = async (id: string) =>
	fetch(`/course/${id}`, {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

export const updateCourse = async (change: Partial<Course>) =>
	fetch('/course/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

export const deleteCourse = async (id: string) =>
	fetch('/course/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
