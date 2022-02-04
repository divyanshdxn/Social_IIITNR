import React, { createContext, useState, Dispatch } from 'react';
import SingleProfileResponse from '../types/response/SingleProfileResponse';
interface ContextValue {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>> | null;
  userData: SingleProfileResponse | null;
  setUserData: React.Dispatch<
    React.SetStateAction<SingleProfileResponse | null>
  > | null;
}
const AppContext = createContext<ContextValue>({
  darkMode: false,
  setDarkMode: null,
  userData: null,
  setUserData: null,
});

export default AppContext;
