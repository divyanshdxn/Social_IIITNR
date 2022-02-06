import axios, { AxiosError } from 'axios';
import React, { ReactText, useRef } from 'react';
import { toast } from 'react-toastify';
import { apiGetOrDelete } from '../../helpers/apiRequest';
import useAppContext from '../../hooks/useAppContext';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import PostByUserResponse from '../../types/response/PostsByUserResponse';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import SinglePost from '../post/SinglePost';
import SinglePostPrev from '../ProfileSection/SinglePostPrev';

interface Props {
  post: PostByUserResponse;
}

const ModifyDeletePost: React.FC<Props> = ({ post }) => {
  const { dispatch } = useMyProfileContext();
  const { setIsModalOpen } = useAppContext();
  const handleModify = () => {};
  const handleDelete = async () => {
    const [res, code] = await toast
      .promise(
        apiGetOrDelete<SinglePostResponse>(
          `/api/post/${post.postId}`,
          {},
          'delete',
        ),
        {
          pending: 'Deleting Post...',
          success: 'Post Deleted Successfully',
          error: 'Could Not Delete Post',
        },
        {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )
      .catch((err) => {
        const error = err as AxiosError;
        console.log(error);
        return [error.response?.data, error.response?.status];
      });
    console.log('delete: ', res, code);
    if (res && code >= 200 && code < 300)
      dispatch({ type: 'delete', payload: post.postId });
    setIsModalOpen(false);
  };
  return (
    <div className=" flex flex-col w-full h-full justify-center items-center">
      <SinglePost post={post} />
      <div className="h-fit flex justify-center gap-3">
        <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500">
          Modify This Post
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400"
          onClick={handleDelete}
        >
          Delete This Post
        </button>
      </div>
    </div>
  );
};

export default ModifyDeletePost;
