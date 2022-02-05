import React, { useState, useEffect } from 'react';

const useDarkMode = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const defaultTheme =
    localStorage.getItem('color-theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(defaultTheme);

  useEffect(() => {
    if (darkMode) localStorage.setItem('color-theme', 'dark');
    else localStorage.setItem('color-theme', 'light');
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
