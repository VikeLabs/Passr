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
		primary: ['#4961e1', '#354bc4'],
		green: ['#35BEA0', '#2A967E'],
	},
};

const theme = {
	fonts: ['Montserrat'],
	fontSizes: {
		xs: 12,
		s: 16,
		m: 20,
		l: 24,
		xl: 28,
	},
	colors: {
		primary: ['#4961e1', '#354bc4'],
		green: ['#35BEA0', '#2A967E'],
	},
	buttons: {
		primary: {
			color: '#ffffff',
			backgroundColor: baseTheme.colors.primary[0],
			'&:hover': {
				backgroundColor: baseTheme.colors.primary[1],
			},
		},
		secondary: {
			backgroundColor: '#FFFFFF',
			color: '#002366',
			'&:hover': {
				backgroundColor: '#E5F2FC',
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
