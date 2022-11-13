import { useQuery, useMutation } from 'react-query';
import { User } from 'api';

import {
	getUser,
	createUser,
	updateUser,
	deleteUser,
} from 'api/userOperations';

export const useReadUser = () => useQuery('user', () => getUser());

export const useCreateUser = () =>
	useMutation((data: User) => createUser(data));

export const useUpdateUser = () =>
	useMutation((data: Partial<User>) => updateUser(data));

export const useDeleteUser = () => useMutation((id: string) => deleteUser(id));
