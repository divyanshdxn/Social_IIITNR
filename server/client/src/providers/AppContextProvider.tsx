import React from 'react';
import AppContext, { ContextValue } from '../contexts/AppContext';

interface Props {
  children?: React.ReactNode;
  value: ContextValue;
}

const AppContextProvider: React.FC<Props> = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
