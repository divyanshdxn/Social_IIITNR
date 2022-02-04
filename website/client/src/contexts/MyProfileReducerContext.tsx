import React, { createContext } from 'react';
import {
  MyProfileReducerAction,
  MyProfileReducerState,
} from '../reducers/MyPostsReducer';
export interface MyProfileContextValue {
  state: MyProfileReducerState;
  dispatch: React.Dispatch<MyProfileReducerAction>;
}
const MyProfileReducerContext = createContext<MyProfileContextValue>({
  state: { myPosts: [], profile: {} },
  dispatch: () => {},
});
export default MyProfileReducerContext;
