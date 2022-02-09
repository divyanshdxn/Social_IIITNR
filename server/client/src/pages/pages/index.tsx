import AllPages from '../../components/AllPages';
import ProfileSection from '../../components/ProfileSection';

interface Props {}
const Pages: React.FC<Props> = () => {
  return (
    <>
      {/* <div
      className="flex h-full justify-between items-stretch overflow-auto "
      > */}
        {/* <ProfileSection hide /> */}
        <AllPages />
      {/* </div> */}
    </>
  );
};
export default Pages;
