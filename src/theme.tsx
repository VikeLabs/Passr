import React from 'react';
import { ThemeProvider } from 'styled-components';
import { colorStyle } from 'styled-system';

const baseTheme = {
	fonts: ['Montserrat'],
	fontSizes: {
		xs: 12,
		s: 16,
		m: 20,
		l: 24,
		xl: 28,
	},
	colors: {
		white: '#ffffff', // need to deide whether we like pure white or not
		text: '#002366',
		primary: ['#4961e1', '#354bc4'],
		secondary: '#E5F2FC',
		positive: ['#35BEA0', '#2A967E'],
		negative: ['#b80f0a', '#880B07'],
		alternate: ['#e0e0e0', '#d0d0d0'],
	},
};

const theme = {
	...baseTheme,
	buttons: {
		primary: {
			color: baseTheme.colors.white,
			backgroundColor: baseTheme.colors.primary[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.primary[1],
			},
		},
		secondary: {
			backgroundColor: baseTheme.colors.white,
			color: baseTheme.colors.text,
			'&:hover': {
				backgroundColor: baseTheme.colors.secondary,
			},
		},
		positive: {
			backgroundColor: baseTheme.colors.positive[0],
			color: baseTheme.colors.white,
			'&:hover': {
				backgroundColor: baseTheme.colors.positive[1],
			},
		},
		negative: {
			backgroundColor: baseTheme.colors.negative[0],
			color: baseTheme.colors.white,
			'&:hover': {
				backgroundColor: baseTheme.colors.negative[1],
			},
		},
		alternate: {
			backgroundColor: baseTheme.colors.alternate[0],
			color: '#002366',
			'&:hover': {
				backgroundColor: baseTheme.colors.alternate[1],
			},
		},
	},
};

interface themeInterface {
	children: React.ReactNode;
}

function Theme({ children }: themeInterface) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
