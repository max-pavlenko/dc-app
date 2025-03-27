/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'loginPage-hero': "url('https://resume-io-helpscout.s3.amazonaws.com/1644317987059/assets/hero-image.svg')",
            },
            backgroundColor: {
                'custom-violet': 'rgb(71, 85, 224)',
            },
            outlineColor: {
                'custom-violet': 'rgb(71, 85, 224)',
            }
        },
    },
    plugins: [],
};
