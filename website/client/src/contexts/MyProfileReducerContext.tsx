import React, { createContext } from 'react';
import {
  MyProfileReducerAction,
  MyProfileReducerState,
} from '../reducers/MyPostsReducer';
export interface MyProfileContextValue {
  state: Partial<MyProfileReducerState>;
  dispatch: React.Dispatch<MyProfileReducerAction>;
}
const MyProfileReducerContext = createContext<Partial<MyProfileContextValue>>(
  {},
);
export default MyProfileReducerContext;
