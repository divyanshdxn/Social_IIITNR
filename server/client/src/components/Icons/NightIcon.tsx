import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {}

const NightIcon: React.FC<Props> = ({ className }) => {
  return (
    <img src="/assets/night.svg" alt="Dark Mode icon" className={className} />
  );
};

export default NightIcon;
