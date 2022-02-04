import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {}

const SunIcon: React.FC<Props> = ({ className }) => {
  return (
    <img src="/assets/sun.svg" alt="Light Mode icon" className={className} />
  );
};

export default SunIcon;
