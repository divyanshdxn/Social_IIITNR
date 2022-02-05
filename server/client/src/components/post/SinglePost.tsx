import React, { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import SingleProfileResponse from '../../types/response/SingleProfileResponse';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: SinglePostResponse;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const { data } = useApi<any, SingleProfileResponse>(
    `/api/profile/${post.profileUserId}`,
    'get',
  );
  const [isReadMore, setIsReadMore] = useState(true);
  useEffect(() => {});

  return (
    <div
      className=" flex flex-col my-2 border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg w-full gap-3"
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
          className="w-full aspect-video bg-background_variant dark:bg-d-background_variant"
          style={{ maxHeight: '44rem' }}
        >
          <img
            src={`/api/media/${post.media}`}
            alt=""
            className="h-full object-contain"
          />
        </div>
      )}
      <div className="flex justify-between dark:invert h-5 px-1">
        <div className="flex gap-5 ">
          <img src="/assets/like.svg" alt="" />
          <img src="/assets/comment.svg" alt="" />
          <img src="/assets/share.svg" alt="" />
        </div>
        <img src="/assets/ellipsis.svg" alt="" />
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
