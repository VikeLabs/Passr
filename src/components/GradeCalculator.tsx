import React from 'react';

type unit = { weight: number; grade: number };
const reducer = (accumulator: unit, currentValue: unit) => ({
	weight: accumulator.weight + currentValue.weight,
	grade: accumulator.grade + currentValue.grade,
});
const remaining = 0;

const array1 = [
	{ weight: 70, grade: { numerator: 7, denominator: 10 } },
	{ weight: 20, grade: 85 },
	{ weight: 5, grade: 60 },
	{ weight: 5, grade: { numerator: 4.5, denominator: 10 } },
	{ weight: 10, grade: undefined },
];

const array2 = [
	{ weight: 5, grade: 100 },
	{ weight: 10, grade: 60 },
	{ weight: 8, grade: 100 },
	{ weight: 7, grade: 100 },
	{ weight: 7, grade: 85.71 },
	{ weight: 8, grade: 87.5 },
	{ weight: 7, grade: 78.57 },
	{ weight: 7, grade: 100 },
	{ weight: 8, grade: 87.5 },
	{ weight: 8, grade: 85.0 },
	{ weight: 2, grade: 100 },
	{ weight: 3, grade: 88.89 },
	{ weight: 4, grade: 50 },
	{ weight: 2, grade: 90.91 },
	{ weight: 2, grade: 92.31 },
	{ weight: 2, grade: 50 },
	{ weight: 10, grade: 100 },
];

function normalize(grade: number | { numerator: number; denominator: number }) {
	if (typeof grade === 'number') {
		return grade / 100;
	}
	// if (typeof grade === 'undefined') {
	// 	return undefined;}
	else {
		return grade.numerator / grade.denominator;
	}
}

const normalizedItems = array2.map((courseItem) => ({
	weight: normalize(courseItem.weight),
	grade: normalize(courseItem.grade),
}));

const normalizedGrade = normalizedItems.map(
	(items) => items.weight * items.grade
);

const justGrades = normalizedItems.map((items) => items.grade);

const justWeight = normalizedItems.map((items) => items.weight);

function currentGradeCalculator() {
	return (
		(justGrades.reduce(
			(accumulator, currentValue) => accumulator + currentValue
		) *
			100) /
		justGrades.length
	);
}

function earnedGradeCalculator() {
	return (
		normalizedGrade.reduce((accumulator, currentValue) => {
			if (currentValue === undefined) {
				currentValue;
			}
			return accumulator + currentValue;
		}) * 100
	);
}

function lostGradeCalculator() {
	const grades = normalizedItems.map(
		(items) => items.grade - items.grade * items.weight
	);
	//console.log(grades);
	return grades.reduce((accumulator, currentValue) => {
		if (currentValue === undefined) {
			currentValue;
		}
		return accumulator + currentValue;
	});
}

function maxGradeCalculator() {
	return (
		justWeight.reduce((accumulator, currentValue) => {
			if (currentValue === undefined) {
				currentValue;
			}
			return accumulator + currentValue;
		}) *
			100 -
		lostGradeCalculator()
	);
}

function averageGradeNeededCalculator(avg: number) {
	const gradeNeeded = earnedGradeCalculator() - avg;
}
export {
	currentGradeCalculator,
	earnedGradeCalculator,
	lostGradeCalculator,
	maxGradeCalculator,
	averageGradeNeededCalculator,
	normalizedItems,
	normalizedGrade,
};
