import { CourseInterface, Grade } from 'api';

function normalize(grade?: Grade) {
	if (typeof grade === 'number') {
		return grade / 100;
	}
	if (typeof grade === 'undefined') {
		return 0;
	}
	if (grade.denominator === 0) {
		return 0;
	}
	return grade.numerator / grade.denominator;
}

function currentGradeCalculator(course: CourseInterface) {
	// earnedGrade / sum of weights with grades
	return (
		earnedGradeCalculator(course) /
		course.courseItems
			.filter((item) => item.grade != undefined)
			.reduce((acc, item) => acc + normalize(item.weight), 0)
	);
}

function earnedGradeCalculator(course: CourseInterface) {
	// Grades * Weights
	const normalizedGrade = course.courseItems.reduce((acc, item) => {
		return acc + normalize(item.weight) * normalize(item.grade);
	}, 0);

	const totalWeight = course.courseItems.reduce((acc, item) => {
		return acc + normalize(item.weight);
	}, 0);
	return (normalizedGrade / totalWeight) * 100;
}

function lostGradeCalculator(course: CourseInterface) {
	// Sum of (weight - (grade * weight))
	return (
		course.courseItems
			.filter((item) => item.grade != undefined)
			.reduce((acc, item) => {
				return (
					acc +
					(normalize(item.weight) -
						normalize(item.grade) * normalize(item.weight))
				);
			}, 0) * 100
	);
}

function averageGradeNeededCalculator(course: CourseInterface) {
	// Gets sum of weights of course items with grades not defined yet
	if (course.desiredGrade === undefined) {
		return 0;
	}
	const weightRemaining = course.courseItems
		.filter((item) => item.grade === undefined)
		.reduce((acc, item) => {
			return acc + item.weight;
		}, 0);

	// Calculates average grades needed on rest of course items to get desired grade
	const gradeNeeded =
		(course.desiredGrade - earnedGradeCalculator(course)) / weightRemaining;

	if (gradeNeeded < 0) {
		return 0;
	}
	return gradeNeeded * 100;
}

export {
	currentGradeCalculator,
	earnedGradeCalculator,
	lostGradeCalculator,
	averageGradeNeededCalculator,
};
