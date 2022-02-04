import React from 'react';
import AppContext from '../contexts/AppContext';

interface Props {
  children?: React.ReactNode;
  value: any;
}

const AppContextProvider: React.FC<Props> = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
