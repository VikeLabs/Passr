import { User } from 'api';
import { handleErrors } from './utils';

export const createUser = async (data: User) =>
	fetch('/user/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(data),
	}).then(handleErrors);

export const getUser = async () =>
	fetch('/user/', {
		headers: { userID: 'user1' },
	})
		.then(handleErrors)
		.then((res) => res.json());

export const updateUser = async (change: Partial<User>) =>
	fetch('/user/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify(change),
	}).then(handleErrors);

export const deleteUser = async (id: string) =>
	fetch('/user/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json', userID: 'user1' },
		body: JSON.stringify({ id }),
	}).then(handleErrors);
