import React, { createContext, useState, Dispatch } from 'react';
import SingleProfileResponse from '../types/response/SingleProfileResponse';
interface ContextValue {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>> | null;
}
const AppContext = createContext<ContextValue>({
  darkMode: false,
  setDarkMode: null,
});

export default AppContext;
