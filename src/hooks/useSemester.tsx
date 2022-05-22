import { useQuery, useMutation } from 'react-query';
import { Semester } from 'api';
import { AddSemesterData } from 'components/AddSemesterModal';

import {
	fetchGetSemester,
	fetchPostSemester,
	fetchPutSemester,
	fetchDeleteSemester,
} from 'api/semesterOperations';

export const useReadSemester = (id: string) =>
	useQuery(['semester', id], () => fetchGetSemester(id));

export const useCreateSemester = () =>
	useMutation((data: AddSemesterData) => fetchPostSemester(data));

export const useUpdateSemester = () =>
	useMutation((data: Partial<Semester>) => fetchPutSemester(data));

export const useDeleteSemester = () =>
	useMutation((id: string) => fetchDeleteSemester(id));
