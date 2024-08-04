/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(({ addBase, theme }) => {
			addBase({
				'.scrollbar': {
					overflowY: 'auto',
					scrollbarColor: `${theme('colors.sky.200')} ${theme('colors.sky.100')}`,
					scrollbarWidth: 'thin',
				},
				'.scrollbar::-webkit-scrollbar': {
					height: '1px',
					width: '1px',
				},
				'.scrollbar::-webkit-scrollbar-thumb': {
					backgroundColor: theme('colors.sky.200'),
				},
				'.scrollbar::-webkit-scrollbar-track-piece': {
					backgroundColor: theme('colors.sky.100'),
				},
			});
		}),
	],
}

