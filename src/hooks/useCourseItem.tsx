import { useQuery, useMutation } from 'react-query';

import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';

import {
	getCourseItem,
	createCourseItem,
	updateCourseItem,
	deleteCourseItem,
} from 'api/courseItemOperations';

export const useReadCourseItem = (id: string) =>
	useQuery(['courseItem', id], () => getCourseItem(id));

export const useCreateCourseItem = () =>
	useMutation((data: AddItemData) => createCourseItem(data));

export const useUpdateCourseItem = () =>
	useMutation((data: Partial<CourseItem>) => updateCourseItem(data));

export const useDeleteCourseItem = () =>
	useMutation((id: string) => deleteCourseItem(id));
