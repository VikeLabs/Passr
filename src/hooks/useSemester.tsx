import { useQuery, useMutation } from 'react-query';
import { Semester } from 'api';
import { AddSemesterData } from 'components/AddSemesterModal';

import {
	getSemester,
	createSemester,
	updateSemester,
	deleteSemester,
} from 'api/semesterOperations';

export const useReadSemester = (id: string) =>
	useQuery(['semester', id], () => getSemester(id));

export const useCreateSemester = () =>
	useMutation((data: AddSemesterData) => createSemester(data));

export const useUpdateSemester = () =>
	useMutation((data: Partial<Semester>) => updateSemester(data));

export const useDeleteSemester = () =>
	useMutation((id: string) => deleteSemester(id));
