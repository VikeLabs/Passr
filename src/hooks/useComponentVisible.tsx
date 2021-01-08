import { useState, useEffect } from 'react';

export default function useComponentVisible(
	ref: React.RefObject<HTMLElement>,
	initialIsVisible = false
) {
	const [isComponentVisible, setIsComponentVisible] = useState(
		initialIsVisible
	);

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return { isComponentVisible, setIsComponentVisible };
}
