import { useState, useEffect } from 'react';

export default function useComponentVisible(
	ref: React.RefObject<HTMLElement>,
	initialIsVisible = false
) {
	const [componentVisible, setComponentVisible] = useState<boolean>(
		initialIsVisible
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const outsideClick =
				ref.current && !ref.current.contains(event.target as Node);

			if (outsideClick) {
				setComponentVisible(false);
			}
		};

		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [ref]);

	return [componentVisible, setComponentVisible] as [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	];
}
