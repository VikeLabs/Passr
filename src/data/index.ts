import { getCurrentSemester } from './api';

export interface Fraction {
	numerator: number;
	denominator: number;
}

export interface CourseItem {
	name: string;
	weight: number;
	grade?: number | Fraction;
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

export { getCurrentSemester };
