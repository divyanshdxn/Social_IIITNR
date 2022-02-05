import MyProfileReducerContext, {
  MyProfileContextValue,
} from '../contexts/MyProfileReducerContext';
import { MyProfileReducerState } from '../reducers/MyPostsReducer';

interface Props {
  children?: React.ReactNode;
  value: any;
}
const MyProfileProvider: React.FC<Props> = ({ children, value }) => {
  return <MyProfileReducerContext.Provider value={value} children={children} />;
};
export default MyProfileProvider;
