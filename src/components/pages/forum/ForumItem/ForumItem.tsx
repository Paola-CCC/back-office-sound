import React, { FC } from 'react';
import './ForumItem.scss';

interface ForumItemProps {}

const ForumItem: FC<ForumItemProps> = () => (
  <div className="ForumItem" data-testid="ForumItem">
    ForumItem Component
  </div>
);

export default ForumItem;
