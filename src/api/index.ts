export { getCurrentSemester } from './api';
export type Grade = number | FractionInterface | undefined;

export interface FractionInterface {
	numerator: number;
	denominator: number;
}

export interface CourseItemInterface {
	id: string;
	name: string;
	weight: number;
	grade?: number | FractionInterface;
	dueDate?: Date;
}

export interface CourseInterface {
	id: string;
	name: string;
	crn?: number;
	courseItems: CourseItemInterface[];
	desiredGrade: number;
}

export interface SemesterInterface {
	id: string;
	name: string;
	courses: CourseInterface[];
}

export interface UserInterface extends Document {
	id: string;
	semesters?: SemesterInterface[];
}
