import { Fraction } from 'api';

export function gradeToString(grade: number | Fraction | undefined) {
	if (grade == undefined) {
		return '';
	} else if (typeof grade === 'object') {
		return `${grade.numerator}/${grade.denominator}`;
	}
	return `${grade}`;
}

export function parseGrade(s: string) {
	const fractionRegex = /([\d]*\.?[\d]+)\/([\d]*\.?[\d]+)/;
	const match = s.match(fractionRegex);
	console.log({ parseGradeMatch: match });
	if (!isNaN(Number(s))) {
		return Number(s);
	} else if (match) {
		return { numerator: Number(match[1]), denominator: Number(match[2]) };
	} else {
		return undefined;
	}
}

//export default Utils;
