/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        // './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                hero: "url('/img/hero-pattern.svg')",
                "footer-texture": "url('/img/footer-texture.png')",
            },
        },
        colors: {
            transparent: "transparent",
            black: "black",
            dark: "#212227",
            light: "#f3eff5",
            "light-green": "#72b01d",
            "dark-green": "#3f7d20",
            bittersweet: "#ee6055",
        },
    },
    plugins: [],
};
