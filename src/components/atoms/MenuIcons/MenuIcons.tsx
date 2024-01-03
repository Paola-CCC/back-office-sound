import React, { FC } from 'react';
import './MenuIcons.scss';

interface MenuIconsProps {
  variant: 'closed' | 'open'
  handleClick: any
}

const MenuIcons: FC<MenuIconsProps> = ({handleClick , variant}) => (

    <button className={`btn-menu ${ variant  === 'closed' ? 'closed' : ''}`}  onClick={handleClick} >
        <label className="hamburger">
          <span className="top-bun"></span>
          <span className="meat"></span>
          <span className="bottom-bun"></span>
        </label>
    </button>
);

export default MenuIcons;