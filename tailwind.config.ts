import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")


const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				'550': '550px',
				'600': '600px',
				'799': '799px',
				'800': '800px',
				'830': '830px',
				'929': '929px',
				'930': '930px',
				'940': '940px',
				'1099': '1099px',
				'1100': '1100px',
				'1170': '1170px',
			},
			spacing: {
				'600': '600px',
			},
			maxWidth: {
				'fa': '1320px',
				"am": '920px',
				'hobby': '360px',
				'inspiration': '840px',
				'logo': '115px',
				'contact': '645px',
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans]
			},
			fontSize: {
				'am': ['0.9rem', '1.4rem'],
			},
			colors: {
				background: '#121212',
				primary: '#5cedc2',
				darkPrimary: '#122f27',
				secondary: '#e453bc',
				softGrey: '#d9d9d91a',
				darkGrey: '#242424',
				whiteText: '#ffffffb3',
				success: '#5cedc2',
				error: '#e453bc',
				textAnimation: '#6666',
				sidebar: {
					DEFAULT: '#121212',
					foreground: 'whiteText',
					primary: '#5cedc2',
					'primary-foreground': '#e453bc',
					accent: '#122f27',
					'accent-foreground': 'whiteText',
					border: '#e453bc',
					ring: '#5cedc2'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				shiny: {
					'0%': {
						left: '-100%'
					},
					'100%': {
						left: '100%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shiny: 'shiny 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config