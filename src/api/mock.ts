import { Semester, Course, CourseItem } from './index';

const Math100Items: CourseItem[] = [
	{
		name: 'Assignment 1',
		weight: 10,
		grade: { numerator: 9, denominator: 10 },
	},
	{
		name: 'Assignment 2',
		weight: 5,
	},
	{
		name: 'Assignment 3',
		weight: 5,
	},
	{
		name: 'Midterm 1',
		weight: 20,
	},
	{
		name: 'Midterm 2',
		weight: 20,
	},
	{
		name: 'Final',
		weight: 40,
	},
];

const MATH100: Course = {
	name: 'Math 100',
	items: Math100Items,
};

const CSC110Items: CourseItem[] = [
	{
		name: 'Assignment 1',
		weight: 5,
		grade: { numerator: 9, denominator: 10 },
	},
	{
		name: 'Assignment 2',
		weight: 5,
		grade: 75,
	},
	{
		name: 'Assignment 3',
		weight: 5,
		grade: 80,
	},
	{
		name: 'Assignment 4',
		weight: 5,
		grade: 85,
	},
	{
		name: 'Assignment 5',
		weight: 5,
		grade: { numerator: 3, denominator: 4 },
	},
	{
		name: 'Assignment 6',
		weight: 5,
	},
	{
		name: 'Assignment 7',
		weight: 5,
	},
	{
		name: 'Assignment 8',
		weight: 5,
	},
	{
		name: 'Midterm 1',
		weight: 20,
		grade: 60,
	},
	{
		name: 'Midterm 2',
		weight: 20,
		grade: 85,
	},
	{
		name: 'Midterm 3',
		weight: 20,
	},
];

const CSC110: Course = {
	name: 'CSC 110',
	items: CSC110Items,
};

const PHYS111Items: CourseItem[] = [
	{
		name: 'Assignment 1',
		weight: 5,
		grade: 75,
	},
	{
		name: 'Assignment 2',
		weight: 5,
		grade: 80,
	},
	{
		name: 'Assignment 3',
		weight: 5,
	},
	{
		name: 'Assignment 4',
		weight: 5,
	},
	{
		name: 'Lab 1',
		weight: 4,
		grade: 90,
	},
	{
		name: 'Lab 2',
		weight: 4,
		grade: { numerator: 7, denominator: 9 },
	},
	{
		name: 'Lab 3',
		weight: 4,
	},
	{
		name: 'Lab 4',
		weight: 4,
	},
	{
		name: 'Lab 5',
		weight: 4,
	},
	{
		name: 'Midterm',
		weight: 20,
		grade: { numerator: 13, denominator: 20 },
	},
	{
		name: 'Final',
		weight: 40,
	},
];

const PHYS111: Course = {
	name: 'PHYS 111',
	items: PHYS111Items,
};

export const Fall2020: Semester = {
	name: 'Fall 2020',
	courses: [MATH100, CSC110, PHYS111],
};
