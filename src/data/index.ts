export interface Course {
	name: string;
	crn?: number;
	items: CourseItem[];
}

export interface CourseItem {
	name: string;
	weight: number;
	grade?: number;
}

export interface Semester {
	name: string;
	courses: Course[];
}
