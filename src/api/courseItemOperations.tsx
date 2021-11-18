import { useQuery, useMutation } from 'react-query';
import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';

// Access client
// const queryClient = useQueryClient();

// create
const putCourseItem = async (data: AddItemData) => {
	await fetch('/courseItem/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	});
};

export const createCourseItem = () =>
	useMutation((data: AddItemData) => putCourseItem(data));

// read
const fetchGetCourseItem = async () =>
	await fetch('/courseItem/e60e5002-9fe8-42eb-adc5-4fe9a67a9e45', {
		method: 'GET',
		headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
	}).then((res) => res.json());

export const readCourseItem = () => useQuery('courseItem', fetchGetCourseItem);

// update
const fetchPostCourseItem = async (change: Partial<CourseItem>) => {
	await fetch('/courseItem/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	});
};

export const updateCourseItem = () =>
	useMutation((data: Partial<CourseItem>) => fetchPostCourseItem(data));

// const createCourseItem = useMutation('mutationkey');

// const updateCourseItem = useMutation('hashkey');

// const deleteCourseItem = useMutation('hashkey');

// delete
export const fetchDeleteCourseItem = async () => {
	await fetch('/courseItem/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
	});
};

export const deleteCourseItem = () =>
	useMutation(() => fetchDeleteCourseItem());
