import React, { useEffect, useState } from 'react';
import { Course, getCurrentSemester } from './api';
import './App.css';
import GradeBookContentContainer from './components/GradeBookContentContainer';
import Logo from './molecules/Logo';

function App() {
	const [course, setCourse] = useState<Course | null>(null);
	useEffect(() => {
		(async () => {
			const sem = await getCurrentSemester();
			setCourse(sem.courses[0]);
		})();
	}, []);

	useEffect(() => {
		// Update semester with API
	}, [course]);

	function updateCourse(course: Course) {
		setCourse(course);
	}
	return (
		<div className="App">
			{course || <h1>Loading</h1>}
			{course && (
				<GradeBookContentContainer
					course={course}
					updateCourse={updateCourse}
				/>
			)}
		</div>
	);
}

export default App;
