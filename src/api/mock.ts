import {
	SemesterInterface,
	CourseInterface,
	CourseItemInterface,
} from './index';

const Math100Items: CourseItemInterface[] = [
	{
		name: 'Assignment 1',
		weight: 10,
		grade: { numerator: 9, denominator: 10 },
	},
	{
		name: 'Assignment 2',
		weight: 5,
		grade: { numerator: 8, denominator: 10 },
		dueDate: new Date('January 20, 2021'),
	},
	{
		name: 'Assignment 3',
		weight: 5,

		dueDate: new Date('February 16, 2021'),
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

const MATH100: CourseInterface = {
	name: 'Math 100',
	courseItems: Math100Items,
	desiredGrade: 80,
};

const CSC110Items: CourseItemInterface[] = [
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

const CSC110: CourseInterface = {
	name: 'CSC 110',
	items: CSC110Items,
};

const PHYS111Items: CourseItemInterface[] = [
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

const PHYS111: CourseInterface = {
	name: 'PHYS 111',
	courseItems: PHYS111Items,
	desiredGrade: 60,
};

export const Fall2020: SemesterInterface = {
	name: 'Fall 2020',
	courses: [MATH100, CSC110, PHYS111],
};
