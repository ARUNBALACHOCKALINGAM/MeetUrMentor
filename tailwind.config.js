/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangejuice: '#F4694C',
        bluebg: '#0d1324',
        bluefill: '#1D2432',
        secondarycolor: '#0f172a',
        bordercolor: '#1c2739',
        textColor: '#A6B9D0',

        // Fireship-inspired color theme for mentors
        mentorPrimary: "#1A1A1A", // Dark background (close to black)
        mentorSecondary: "#FF3C00", // Fiery red-orange for accents
        mentorAccent: "#FF9505", // Bright orange for highlights
        mentorButtonColor: "#FF5714", // Deep fiery orange for buttons

        // Facebook color theme for students
        studentPrimary: "#4267B2", // Facebook Blue
        studentSecondary: "#E9EBEE", // Facebook Light Gray
        studentAccent: "#1877F2", // Facebook Accent Blue
        studentButtonColor: "#385898", // Facebook Dark Blue
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
  ],
};
