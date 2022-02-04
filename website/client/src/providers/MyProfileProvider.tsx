import MyProfileReducerContext, {
  MyProfileContextValue,
} from '../contexts/MyProfileReducerContext';
import { MyProfileReducerState } from '../reducers/MyPostsReducer';

const MyProfileProvider: React.Provider<Partial<MyProfileContextValue>> =
  MyProfileReducerContext.Provider;
export default MyProfileProvider;
