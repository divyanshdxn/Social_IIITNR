import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {}

const EditIcon: React.FC<Props> = ({ className }) => {
  return <img src="/assets/edit.svg" alt="Edit icon" className={className} />;
};

export default EditIcon;
