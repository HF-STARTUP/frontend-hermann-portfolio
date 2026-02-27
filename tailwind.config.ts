/** @type {import('tailwindcss').Config} */
const {fontFamily} = require("tailwindcss/defaultTheme")

module.exports = {
    darkMode: ["class"],
    content: [
        "./node_modules/tw-elements/dist/js/**/*.js",
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                vaPrimary: "#0A255B",
                vaYellow: "#FFC700",
                vaGreen: "#00A757",
                vaOrange: "#FF9900",
                vaRed: "#E51D13",
                vaBlue: "#018BFB",
                vaTextPrimary: "#506D82",

                'admin-primary': '#506D82',
                'text-body': '#80878C',
                'blue-primary': '#205DD3',
                'blue-secondary': '#01BEFB',
                'success': '#009950',
                'green-correct': '#02B66A',
                'vyellow': '#FFC700',
                'vred': '#E51D13',
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                vInter: ['Inter', 'sans-serif'],
                vMulish: ['Mulish'],
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                },
                screens: {
                    sm: '600px',
                    md: '728px',
                    lg: '984px',
                    xl: '1380px',
                },
            },
        }
    },
    plugins: [
        require("tw-elements/dist/plugin.cjs"),
        require('tailwind-scrollbar')({nocompatible: true}),
        require("tailwindcss-animate")
        //require('flowbite/plugin')
    ],
}
