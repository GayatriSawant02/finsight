/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme from localStorage on initialization
    const savedTheme = localStorage.getItem('finsight-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('finsight-theme', newTheme ? 'dark' : 'light');
  };

  // Theme-aware class utilities
  const themeClasses = {
    // Card backgrounds
    cardBg: isDarkMode ? 'bg-[#0E1524]' : 'bg-white',
    cardBorder: isDarkMode ? 'border-[#1E293B]' : 'border-gray-200',

    // Text colors
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-500' : 'text-gray-500',

    // Background colors
    bgPrimary: isDarkMode ? 'bg-[#070B13]' : 'bg-gray-50',
    bgSecondary: isDarkMode ? 'bg-[#0E1524]' : 'bg-gray-100',
    bgTertiary: isDarkMode ? 'bg-[#1A233A]' : 'bg-gray-200',

    // Input styles
    inputBg: isDarkMode ? 'bg-[#111827]' : 'bg-gray-100',
    inputText: isDarkMode ? 'text-gray-200' : 'text-gray-900',
    inputPlaceholder: isDarkMode ? 'placeholder-gray-500' : 'placeholder-gray-400',
    inputBorder: isDarkMode ? 'border-transparent' : 'border-gray-300',

    // Button styles
    buttonPrimary: isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700',
    buttonSecondary: isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-900',

    // Icon colors
    iconPrimary: isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeClasses }}>
      <div className={isDarkMode ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};;