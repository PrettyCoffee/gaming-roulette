/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        page: "var(--page)",
        background: "var(--background)",
        foreground: "var(--foreground)",
  
        hover: "var(--hover)",
  
        button: {
          DEFAULT: "var(--button)",
          hover: "var(--button-hover)",
        },
  
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
  
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
  
        accent: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
  content: ["./index.html","./src/**/*.{svelte,js,ts}"],
}

