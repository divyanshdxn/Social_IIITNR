import React, { useEffect, useState } from 'react';
import getMedia from '../../helpers/getMedia';
import useApi from '../../hooks/useApi';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import SingleProfileResponse from '../../types/response/SingleProfileResponse';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: SinglePostResponse;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { data } = useApi<any, SingleProfileResponse>(
    `/api/profile/${post.profileUserId}`,
    'get',
  );
  const [isReadMore, setIsReadMore] = useState(true);
  const handleLike = async () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="flex flex-col my-2 border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg w-full gap-3"
      style={{ maxWidth: '830px' }}
    >
      <div className=" flex gap-3 h-8">
        <div
          className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden 
            bg-background_variant dark:bg-d-background_variant"
        >
          <img src={`${data?.photoUrl}`} alt="" />
        </div>
        <div>{data?.firstName}</div>
      </div>
      {post.media && (
        <div
          className=" flex justify-center w-full aspect-video bg-background_variant dark:bg-d-background_variant"
          style={{ maxHeight: '25rem' }}
        >
          <img
            src={getMedia(post.media)[0].url}
            alt=""
            className="h-full object-contain"
          />
        </div>
      )}
      <div className="flex justify-between dark:invert h-5 px-1">
        <div className="flex gap-5 ">
          <div
            className="relative h-[20.5px] w-[20.5px] group cursor-pointer"
            onClick={handleLike}
          >
            <BsHeart
              className={`absolute h-[20px] w-[20px] text-gray-600 
            inset-0 group-hover:bg-background dark:group-hover:bg-d-background_variant
                transition-opacity group-hover:opacity-0`}
            />
            <BsHeartFill
              className={`absolute h-[20px] w-[20px] 
                transition-opacity opacity-${isLiked ? '100' : '0'} 
                text-red-600 dark:hover:text-d-background_variant
                ${
                  isLiked || 'group-hover:opacity-50'
                } dark:group-hover:opacity-70 z-20
                `}
            />
          </div>
          <img src="/assets/comment.svg" />
          <img src="/assets/share.svg" />
        </div>
        <img src="/assets/ellipsis.svg" />
      </div>
      <div className="text-sm flex flex-col items-start">
        <span>
          {post.caption.length > 120 && isReadMore
            ? post.caption.slice(0, 120) + '...'
            : post.caption}
        </span>
        {post.caption.length > 120 && (
          <button
            className="text-primary dark:text-d-primary"
            onClick={() => {
              setIsReadMore((prev) => !prev);
            }}
          >
            {isReadMore ? 'Read More' : 'Show Less'}
          </button>
        )}
      </div>
    </div>
  );
};
export default SinglePost;
