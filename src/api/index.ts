export { getCurrentSemester } from './api';

export interface Fraction {
	numerator: number;
	denominator: number;
}

export interface CourseItem {
	name: string;
	weight?: number;
	grade?: number | Fraction;
	dueDate?: Date;
}

export interface Course {
	name: string;
	crn?: number;
	items: CourseItem[];
}

export interface Semester {
	name: string;
	courses: Course[];
}
