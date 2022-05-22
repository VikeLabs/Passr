import { useQuery, useMutation } from 'react-query';
import { Course } from 'api';
import { AddCourseData } from 'components/AddCourseModal';

import {
	fetchGetCourse,
	fetchPostCourse,
	fetchPutCourse,
	fetchDeleteCourse,
} from 'api/courseOperations';

export const useReadCourse = (id: string) =>
	useQuery(['course', id], () => fetchGetCourse(id));

export const useCreateCourse = () =>
	useMutation((data: AddCourseData) => fetchPostCourse(data));

export const useUpdateCourse = () =>
	useMutation((data: Partial<Course>) => fetchPutCourse(data));

export const useDeleteCourse = () =>
	useMutation((id: string) => fetchDeleteCourse(id));
