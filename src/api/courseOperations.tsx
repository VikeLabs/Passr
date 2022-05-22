import { Course } from 'api';
import { AddCourseData } from 'components/AddCourseModal';

const handleErrors = (response: Response) => {
	if (!response.ok) {
		throw Error('fetch unsuccessful');
	}
	return response;
};

// create
export const fetchPostCourse = async (data: AddCourseData) =>
	fetch('/course/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

// read
export const fetchGetCourse = async (id: string) =>
	fetch(`/course/${id}`, {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

// update
export const fetchPutCourse = async (change: Partial<Course>) =>
	fetch('/course/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

// delete
export const fetchDeleteCourse = async (id: string) =>
	fetch('/course/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
