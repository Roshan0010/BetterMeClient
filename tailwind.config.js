/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}" ],
	theme: {
		extend: {
			screens: {
				xxs: "200px",
				xs: "300px",
				sm: "480px",
				smd: "600px",
				md: "768px",
				lg: "976px",
				lgxl: "1024px",
        lgx:"1220px",
				xl: "1440px",
			},
		},
	},
	plugins: [],
};
