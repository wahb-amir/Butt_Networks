"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDarkMode(dark);
    if (dark) document.body.classList.add("dark-mode");
  }, []);

  const toggle = () => {
    const darkModeOn = !isDarkMode;
    setIsDarkMode(darkModeOn);
    document.body.classList.toggle("dark-mode", darkModeOn);
    localStorage.setItem("theme", darkModeOn ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
