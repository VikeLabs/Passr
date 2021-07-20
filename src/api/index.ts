export { getCurrentSemester } from './api';
export type Grade = number | Fraction | undefined;

/* These interfaces are models in our database */
export interface Fraction {
	numerator: number;
	denominator: number;
}

export interface CourseItem {
	id?: string;
	owner?: string;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	weight: number;
	grade?: number | Fraction;
	dueDate?: Date;
}

export interface Course {
	id?: string;
	owner?: string;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	courseItems: CourseItem[];
	desiredGrade: number;
}

export interface Semester {
	id?: string;
	owner?: string;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	courses: Course[];
}

export interface User extends Document {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	semesters: Semester[];
}
