import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

export interface BaseTheme {
	fontSizes: { xs: string; s: string; m: string; l: string; xl: string };
	colors: {
		main: [string, string];
		text: [string, string, string];
		gray: [string, string, string, string];
		primary: [string, string];
		secondary: [string, string];
		positive: [string, string];
		negative: [string, string];
		alternate: [string, string];
		disabled: [string, string];
		error: string;
	};
}

const baseTheme: BaseTheme = {
	fontSizes: {
		xs: '0.8rem',
		s: '1rem',
		m: '1.2rem',
		l: '1.4rem',
		xl: '1.8rem',
	},
	colors: {
		main: ['#ffffff', '#f8f8f8'],
		text: ['#ffffff', '#002366', '#000000'],
		gray: ['#ededed', '#d5d5d5', '#bdbdbd', '#828282'],
		primary: ['#4961e1', '#354bc4'],
		secondary: ['#e5f2fC', '#f2f2f2'],
		positive: ['#35bea0', '#2a967e'],
		negative: ['#b80f0a', '#990c08'],
		alternate: ['#e0e0e0', '#d0d0d0'],
		disabled: ['#4D4D4D', '#C2C2C2'],
		error: '#ff8888',
	},
};

export interface ButtonVariants {
	buttons: {
		primary: {
			color: string;
			backgroundColor: string;
			'&:hover': {
				backgroundColor: string;
			};
		};
		secondary: {
			color: string;
			backgroundColor: string;
			'&:hover': {
				backgroundColor: string;
			};
		};
		positive: {
			color: string;
			backgroundColor: string;
			'&:hover': {
				backgroundColor: string;
			};
		};
		negative: {
			color: string;
			backgroundColor: string;
			'&:hover': {
				backgroundColor: string;
			};
		};
		alternate: {
			color: string;
			backgroundColor: string;
			'&:hover': {
				backgroundColor: string;
			};
		};
		disabled: {
			color: string;
			backgroundColor: string;
		};
	};
}

const buttonVariants: ButtonVariants = {
	buttons: {
		primary: {
			color: baseTheme.colors.text[0],
			backgroundColor: baseTheme.colors.primary[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.primary[1],
			},
		},
		secondary: {
			color: baseTheme.colors.text[1],
			backgroundColor: baseTheme.colors.main[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.secondary[1],
			},
		},
		positive: {
			backgroundColor: baseTheme.colors.positive[0],
			color: baseTheme.colors.text[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.positive[1],
			},
		},
		negative: {
			backgroundColor: baseTheme.colors.negative[0],
			color: baseTheme.colors.text[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.negative[1],
			},
		},
		alternate: {
			backgroundColor: baseTheme.colors.alternate[0],
			color: baseTheme.colors.text[1],
			'&:hover': {
				backgroundColor: baseTheme.colors.alternate[1],
			},
		},
		disabled: {
			backgroundColor: baseTheme.colors.disabled[0],
			color: baseTheme.colors.disabled[1],
		},
	},
};

const theme: DefaultTheme = {
	...baseTheme,
	...buttonVariants,
};

const Theme: React.FC = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
