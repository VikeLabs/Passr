import { User } from 'api';

const handleErrors = (response: Response) => {
	if (!response.ok) {
		throw new Error('fetch unsuccessful');
	}
	return response;
};

// create
export const fetchPostUser = async (data: User) =>
	fetch('/user/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

// read
export const fetchGetUser = async () =>
	fetch('/user/', {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

// update
export const fetchPutUser = async (change: Partial<User>) =>
	fetch('/user/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

// delete
export const fetchDeleteUser = async (id: string) =>
	fetch('/user/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
