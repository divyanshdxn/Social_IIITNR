import apiGet from '../helpers/apiGet';
import PostByUserResponse from '../types/response/PostsByUserResponse';
import SinglePostResponse from '../types/response/SinglePostResponse';
import SingleProfileResponse from '../types/response/SingleProfileResponse';

export interface MyProfileReducerState {
  myPosts: PostByUserResponse[];
  profile: Partial<SingleProfileResponse>;
}
export type MyProfileReducerAction =
  | { type: 'set-profile'; payload: SingleProfileResponse }
  | { type: 'set-posts'; payload: PostByUserResponse[] }
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
    case 'set-profile':
      state = { ...state, profile: payload as SingleProfileResponse };
      break;
    case 'set-posts':
      state = { ...state, myPosts: payload as PostByUserResponse[] };
      console.log('payload:', payload);

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
