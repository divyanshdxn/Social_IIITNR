import React, { useEffect, useState } from 'react';
import { apiGet } from '../../helpers/apiRequest';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import SinglePostPrev from './SinglePostPrev';

interface Props {
  userID: string | null | undefined;
  owner: boolean;
}

const PostList: React.FC<Props> = ({ userID, owner }) => {
  const [data, setData] = useState<PostByUserResponse[]>([]);
  const { state, dispatch } = useMyProfileContext();
  const getData = async () => {
    try {
      if (userID) {
        const [res] = await apiGet<PostByUserResponse[]>(
          `/api/post/user/${userID}`,
        );
        console.log(res);
        if (owner) dispatch({ type: 'set-posts', payload: res });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userID]);
  useEffect(() => {
    setData(state.myPosts);
  });
  return (
    <div className=" w-full mt-6 flex-1 basis-1/3" style={{ maxHeight: '45%' }}>
      <h2 className="text-lg ml-1">Your Posts</h2>
      <div
        className="flex flex-col justify-start gap-3 w-full h-full 
	  overflow-y-auto py-1 px-1"
      >
        {state.myPosts.map((item, index) => {
          return <SinglePostPrev data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
