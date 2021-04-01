export { getCurrentSemester } from './api';
export type Grade = number | FractionInterface | undefined;

export interface FractionInterface {
	numerator: number;
	denominator: number;
}

export interface CourseItemInterface {
	name: string;
	weight: number;
	grade?: number | FractionInterface;
	dueDate?: Date;
}

export interface CourseInterface {
	name: string;
	crn?: number;
	courseItems?: CourseItemInterface[];
	desiredGrade: number;
}

export interface SemesterInterface {
	name: string;
	courses?: CourseInterface[];
}

export interface UserInterface extends Document {
	semesters?: SemesterInterface[];
}
