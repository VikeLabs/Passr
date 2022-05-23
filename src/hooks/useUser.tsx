import { useQuery, useMutation } from 'react-query';
import { User } from 'api';

import {
	fetchGetUser,
	fetchPostUser,
	fetchPutUser,
	fetchDeleteUser,
} from 'api/userOperations';

export const useReadUser = () => useQuery('user', () => fetchGetUser());

export const useCreateUser = () =>
	useMutation((data: User) => fetchPostUser(data));

export const useUpdateUser = () =>
	useMutation((data: Partial<User>) => fetchPutUser(data));

export const useDeleteUser = () =>
	useMutation((id: string) => fetchDeleteUser(id));
