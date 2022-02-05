import React, { useContext } from 'react';
import MyProfileReducerContext from '../contexts/MyProfileReducerContext';

export function useMyProfileContext() {
  return useContext(MyProfileReducerContext);
}
