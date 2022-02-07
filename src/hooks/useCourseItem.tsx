import { useQuery, useMutation } from 'react-query';
import { CourseItem } from 'api';
import { AddItemData } from 'components/AddItemModal';

import {
	fetchGetCourseItem,
	fetchPostCourseItem,
	fetchPutCourseItem,
	fetchDeleteCourseItem,
} from 'api/courseItemOperations';

export const useReadCourseItem = (id: string) =>
	useQuery('courseItem', () => fetchGetCourseItem(id));

export const useCreateCourseItem = () =>
	useMutation((data: AddItemData) => fetchPostCourseItem(data));

export const useUpdateCourseItem = () =>
	useMutation((data: Partial<CourseItem>) => fetchPutCourseItem(data));

export const useDeleteCourseItem = () =>
	useMutation((id: string) => fetchDeleteCourseItem(id));
