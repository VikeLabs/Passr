export { getCurrentSemester } from './api';
export type Grade = number | Fraction | undefined;

export interface Fraction {
	numerator: number;
	denominator: number;
}

export interface CourseItem {
	name: string;
	weight: number;
	grade?: Grade;
	dueDate?: Date;
}

export interface Course {
	name: string;
	crn?: number;
	items: CourseItem[];
	desiredGrade?: number;
}

export interface Semester {
	name: string;
	courses: Course[];
}
