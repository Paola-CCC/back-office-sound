import classNames from 'classnames';
import React from 'react';

export const Image = ({className, src , alt}) => {


 const classValue = classNames("_img",{});

  return (
    <>
        {src && src !== '' && (
            <img  className={classValue} src={src} alt={alt} />
        )}
    </>
    )
}

