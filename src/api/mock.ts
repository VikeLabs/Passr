import { Semester, Course, CourseItem } from './index';

const Math100Items: CourseItem[] = [
	{
		id: 'c234t2m7',
		name: 'Assignment 1',
		weight: 10,
		grade: { numerator: 9, denominator: 10 },
	},
	{
		id: '3mu824mp',
		name: 'Assignment 2',
		weight: 5,
		grade: { numerator: 8, denominator: 10 },
		dueDate: new Date('January 20, 2021'),
	},
	{
		id: 'n8uc9pm0',
		name: 'Assignment 3',
		weight: 5,
		dueDate: new Date('February 16, 2021'),
	},
	{
		id: 'm893lwef',
		name: 'Midterm 1',
		weight: 20,
	},
	{
		id: 'k329f7d9',
		name: 'Midterm 2',
		weight: 20,
	},
	{
		id: 'io42fj4n',
		name: 'Final',
		weight: 40,
	},
];

const MATH100: Course = {
	id: '84jvkq11',
	name: 'Math 100',
	courseItems: Math100Items,
	desiredGrade: 80,
};

const CSC110Items: CourseItem[] = [
	{
		id: 'vy8amquo',
		name: 'Assignment 1',
		weight: 5,
		grade: { numerator: 9, denominator: 10 },
	},
	{
		id: 'jb5wy7jx',
		name: 'Assignment 2',
		weight: 5,
		grade: 75,
	},
	{
		id: 'bmvnno73',
		name: 'Assignment 3',
		weight: 5,
		grade: 80,
	},
	{
		id: 'bnyjauol',
		name: 'Assignment 4',
		weight: 5,
		grade: 85,
	},
	{
		id: 'g0p3p59m',
		name: 'Assignment 5',
		weight: 5,
		grade: { numerator: 3, denominator: 4 },
	},
	{
		id: 'oxo34929',
		name: 'Assignment 6',
		weight: 5,
	},
	{
		id: 'ybccq9iq',
		name: 'Assignment 7',
		weight: 5,
	},
	{
		id: '8j6dxeye',
		name: 'Assignment 8',
		weight: 5,
	},
	{
		id: 'xbovaqnv',
		name: 'Midterm 1',
		weight: 20,
		grade: 60,
	},
	{
		id: 'v40rpo7y',
		name: 'Midterm 2',
		weight: 20,
		grade: 85,
	},
	{
		id: 'j1no3ws6',
		name: 'Midterm 3',
		weight: 20,
	},
];

const CSC110: Course = {
	id: 'ynlq4qre',
	name: 'CSC 110',
	courseItems: CSC110Items,
	desiredGrade: 75,
};

const PHYS111Items: CourseItem[] = [
	{
		id: '33yeqkq1',
		name: 'Assignment 1',
		weight: 5,
		grade: 75,
	},
	{
		id: 'znb1ueec',
		name: 'Assignment 2',
		weight: 5,
		grade: 80,
	},
	{
		id: 'b75dzn83',
		name: 'Assignment 3',
		weight: 5,
	},
	{
		id: 'zliql2yv',
		name: 'Assignment 4',
		weight: 5,
	},
	{
		id: 'w873iby6',
		name: 'Lab 1',
		weight: 4,
		grade: 90,
	},
	{
		id: 'acmxcbgp',
		name: 'Lab 2',
		weight: 4,
		grade: { numerator: 7, denominator: 9 },
	},
	{
		id: 'jt0a7l6y',
		name: 'Lab 3',
		weight: 4,
	},
	{
		id: '4vendf7l',
		name: 'Lab 4',
		weight: 4,
	},
	{
		id: 'd1vvm5ka',
		name: 'Lab 5',
		weight: 4,
	},
	{
		id: 'fqemoguv',
		name: 'Midterm',
		weight: 20,
		grade: { numerator: 13, denominator: 20 },
	},
	{
		id: 'zzqyex7k',
		name: 'Final',
		weight: 40,
	},
];

const PHYS111: Course = {
	id: 'otdl0koo',
	name: 'PHYS 111',
	courseItems: PHYS111Items,
	desiredGrade: 60,
};

export const Fall2020: Semester = {
	id: '3oeg11pf',
	name: 'Fall 2020',
	courses: [MATH100, CSC110, PHYS111],
};
