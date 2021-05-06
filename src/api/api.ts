import { Fall2020 } from './mock';
import { Course } from './index';

export function getCurrentSemester() {
	return Promise.resolve(Fall2020);
}

export async function createCourse(course: Course) {
	course;
	return false;
}

export async function updateCourse(course: Partial<Course>) {
	course;
	return false;
}

export async function getCourse(id: string) {
	id;
	return false;
}

export async function deleteCourse(id: string) {
	id;
	return false;
}
