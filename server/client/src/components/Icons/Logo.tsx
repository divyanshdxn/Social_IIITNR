import React from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Logo: React.FC<Props> = (className) => {
  return (
    <img
      src="/assets/logo.svg"
      alt="app logo"
      className={className.className}
    />
  );
};

export default Logo;
