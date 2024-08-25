import type { Config } from 'tailwindcss'

export default {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        fontFamily: {
            body: 'var(--sonaleela-font-body)',
            display: 'var(--sonaleela-font-display)',
        },
        fontSize: {
            50: 'var(--sonaleela-font-size-50)',
            75: 'var(--sonaleela-font-size-75)',
            100: 'var(--sonaleela-font-size-100)',
            200: 'var(--sonaleela-font-size-200)',
            300: 'var(--sonaleela-font-size-300)',
            400: 'var(--sonaleela-font-size-400)',
            500: 'var(--sonaleela-font-size-500)',
            600: 'var(--sonaleela-font-size-600)',
            800: 'var(--sonaleela-font-size-800)',
            1000: 'var(--sonaleela-font-size-1000)',
            1200: 'var(--sonaleela-font-size-1200)',
            1300: 'var(--sonaleela-font-size-1300)',
        },
        colors: {
            'transparent': 'transparent',
            'current': 'currentColor',
            'white': 'white',
            'primary': {
                400: 'var(--sonaleela-primary-400)',
            },
            'secondary': {
                400: 'var(--sonaleela-secondary-400)',
            },
            'gray': {
                50: 'var(--sonaleela-gray-50)',
                75: 'var(--sonaleela-gray-75)',
                100: 'var(--sonaleela-gray-100)',
                200: 'var(--sonaleela-gray-200)',
                300: 'var(--sonaleela-gray-300)',
                400: 'var(--sonaleela-gray-400)',
                500: 'var(--sonaleela-gray-500)',
                600: 'var(--sonaleela-gray-600)',
                700: 'var(--sonaleela-gray-700)',
                800: 'var(--sonaleela-gray-800)',
                900: 'var(--sonaleela-gray-900)',
            },
            'blue': {
                400: 'var(--sonaleela-blue-400)',
                500: 'var(--sonaleela-blue-500)',
                600: 'var(--sonaleela-blue-600)',
                700: 'var(--sonaleela-blue-700)',
            },
            'red': {
                400: 'var(--sonaleela-red-400)',
                500: 'var(--sonaleela-red-500)',
                600: 'var(--sonaleela-red-600)',
                700: 'var(--sonaleela-red-700)',
            },
            'green': {
                400: 'var(--sonaleela-green-400)',
                500: 'var(--sonaleela-green-500)',
                600: 'var(--sonaleela-green-600)',
                700: 'var(--sonaleela-green-700)',
            },
            'orange': {
                400: 'var(--sonaleela-orange-400)',
                500: 'var(--sonaleela-orange-500)',
                600: 'var(--sonaleela-orange-600)',
                700: 'var(--sonaleela-orange-700)',
            }
        },
        extend: {
            animation: {
                'bounce-in-forward': 'bounce-in-forward 0.3s 1 both',
                'expand-and-collapse': 'expand-and-collapse 0.3s 1 both',
                'slide-down': 'slide-down 0.3s 1 both',
            },
            backgroundImage: {
                'signin-page': "url('/assets/img/bg-signin.jpg')",
                'recovery-page': "url('/assets/img/bg-signup-3.jpg')",
                'signup-page': "url('/assets/img/bg-signup-2.jpg')",
                'master': "url('/assets/img/bg-master.svg')",
            },
            width: {
                'side-nav': 'var(--sonaleela-side-nav-size)',
                'side-nav-secondary': 'var(--sonaleela-side-nav-size-secondary)',
            },
            maxWidth: {
                '120': '30rem',
            },
            gridTemplateColumns: {
                'fill-60': 'repeat(auto-fill, minmax(12rem, 1fr))'
            },
            spacing: {
                40: '10rem',
            },
            margin: {
                8: '2rem'
            },
            flex: {
                2: '2 2 0%'
            }
        }
    },
    plugins: [],
} satisfies Config

