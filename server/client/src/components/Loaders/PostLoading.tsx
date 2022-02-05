import React from 'react';
import ContentLoader, { Instagram } from 'react-content-loader';
import useAppContext from '../../hooks/useAppContext';
import useDarkMode from '../../hooks/useDarkMode';

const PostLoading: React.FC = (props) => {
  const { darkMode } = useAppContext();
  return (
    <div
      className=" my-2 border-2 border-hints dark:border-d-hints 
      p-4 rounded-lg w-full"
      style={{ height: '450px' }}
    >
      <ContentLoader
        viewBox="0 0 100% 100% "
        speed={2}
        width="100%"
        height="100%"
        backgroundColor={`${darkMode ? '#151515' : '#f3f3f3'}`}
        foregroundColor={`${darkMode ? '#202020' : '#e0e0e0'}`}
        {...props}
      >
        <circle cx="31" cy="31" r="15" />
        <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
        <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
        <rect x="0" y="60" rx="2" ry="2" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};

export default PostLoading;
