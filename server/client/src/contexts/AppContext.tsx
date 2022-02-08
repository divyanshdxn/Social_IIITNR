import React, { createContext } from 'react';
export interface ContextValue {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>> | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  modalChildren: React.ReactNode;
  setModalChildren: React.Dispatch<React.SetStateAction<JSX.Element>>;
}
const AppContext = createContext<ContextValue>({
  darkMode: false,
  setDarkMode: null,
  isModalOpen: false,
  setIsModalOpen: (mode) => {
    console.log('Modal: ', mode);
  },
  modalChildren: null,
  setModalChildren: () => {},
});

export default AppContext;
