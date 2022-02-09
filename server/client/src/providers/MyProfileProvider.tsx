import MyProfileReducerContext from '../contexts/MyProfileReducerContext';

interface Props {
  children?: React.ReactNode;
  value: any;
}
const MyProfileProvider: React.FC<Props> = ({ children, value }) => {
  return <MyProfileReducerContext.Provider value={value} children={children} />;
};
export default MyProfileProvider;
