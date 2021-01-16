import React from 'react';
import { Course, Semester } from '../api';
import { getCurrentSemester } from '../api/api';

const semester = getCurrentSemester();

function currentGradeCalculator(course: Course) {
	course.items.map((item) => {
		return item.grade;
	});
}

// function earnedGradeCalculator{}

// function lostGradeCalculator{}

// function maxGradeCalculator{}

// function averageGradeNeededCalculator{}
export default currentGradeCalculator;
