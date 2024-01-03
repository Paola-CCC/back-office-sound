import React from 'react';
import "./Icons.scss";

interface IconsProps  {
  children: any;
}

const Icons: React.FC<IconsProps> = ({children}) => {

  return (
    <>
      {children}
    </>
  )
}

export default Icons ;