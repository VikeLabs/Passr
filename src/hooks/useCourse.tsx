import { useQuery, useMutation } from 'react-query';
import { Course } from 'api';
import { AddCourseData } from 'components/AddCourseModal';

import {
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
} from 'api/courseOperations';

export const useReadCourse = (id: string) =>
	useQuery(['course', id], () => getCourse(id));

export const useCreateCourse = () =>
	useMutation((data: AddCourseData) => createCourse(data));

export const useUpdateCourse = () =>
	useMutation((data: Partial<Course>) => updateCourse(data));

export const useDeleteCourse = () =>
	useMutation((id: string) => deleteCourse(id));
