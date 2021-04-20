export { getCurrentSemester } from './api';
export type Grade = number | Fraction | undefined;

export interface Fraction {
	numerator: number;
	denominator: number;
}

export interface CourseItem {
	id: string;
	name: string;
	weight: number;
	grade?: number | Fraction;
	dueDate?: Date;
}

export interface Course {
	id: string;
	name: string;
	crn?: number;
	courseItems: CourseItem[];
	desiredGrade: number;
}

export interface Semester {
	id: string;
	name: string;
	courses: Course[];
}

export interface User extends Document {
	id: string;
	semesters: Semester[];
}
