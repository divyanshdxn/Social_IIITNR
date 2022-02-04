import apiGet from '../helpers/apiGet';
import SinglePostResponse from '../types/response/SinglePostResponse';
import SingleProfileResponse from '../types/response/SingleProfileResponse';

export interface MyProfileReducerState {
  myPosts: SinglePostResponse[];
  profile?: SingleProfileResponse;
}
export type MyProfileReducerAction =
  | { type: 'set-local'; payload: Partial<MyProfileReducerState> }
  | { type: 'new-post'; payload: MyProfileReducerState }
  | { type: 'delete'; payload: Partial<MyProfileReducerState> }
  | {
      type: 'update';
      payload: {
        id: string;
        update: Partial<MyProfileReducerState>;
      };
    };

export type MyProfileReducerType = (
  state: MyProfileReducerState,
  action: MyProfileReducerAction,
) => MyProfileReducerState;

const MyProfileReducer: MyProfileReducerType = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'set-local':
      if ('profile' in payload) {
        state.profile = payload.profile;
      }
	  if('myPosts' in payload && payload.myPosts) {
		  state.myPosts = payload.myPosts;
	  }
      break;
    case 'delete':
      break;
    case 'new-post':
      break;
    case 'delete':
      break;
  }
  return state;
};

export default MyProfileReducer;
