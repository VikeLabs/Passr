import { useQuery, useMutation, useQueryClient } from 'react-query';

// Access client
const queryClient = useQueryClient();

const getCourseItem = async () =>
	await fetch('http://localhost:5000', {
		method: 'GET',
		headers: { userID: 'user1' }, // REMINDER: REMOVE HADRCODED USER ID
	});

const createCourseItem = useMutation('mutationkey');

export const readCourseItem = useQuery('queryKey', getCourseItem);

const updateCourseItem = useMutation('hashkey');

const deleteCourseItem = useMutation('hashkey');
