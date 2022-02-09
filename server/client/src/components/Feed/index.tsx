import React from 'react';
import useApi from '../../hooks/useApi';
import SinglePostResponse from '../../types/response/SinglePostResponse';
import PostLoading from '../Loaders/PostLoading';
import NewPost from '../NewPost';
import SinglePost from '../post/SinglePost';

interface Props {}

const Feed: React.FC<Props> = () => {
  const { isSuccess, isLoading, data } = useApi<any, SinglePostResponse[]>(
    '/api/post',
    'get',
  );
  return (
    <div
      className="flex relative flex-col items-center flex-1 top-12 translate-y-6 h-fit"
      style={{ minHeight: 'calc(100% - 5rem)' }}
    >
      <NewPost />
      {isLoading ? (
        <PostLoading />
      ) : (
        isSuccess &&
        data?.map((item, index) => {
          return <SinglePost post={item} key={index} />;
        })
      )}
      {!isLoading && (
        <div className="flex flex-col justify-center  items-center mt-3 mb-5 w-full text-text-secondary">
          You have reached the end of the feed.
          <div className="flex gap-3 text-xs">
            {/* <button>
            <span className="text-text-primary">Load More</span>
          </button> */}
            <button
              className="cursor-pointer"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <span className="text-text-primary">Go to the top</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
