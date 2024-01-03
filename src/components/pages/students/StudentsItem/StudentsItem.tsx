import React, { FC } from 'react';
import './StudentsItem.scss';

interface StudentsItemProps {}

const StudentsItem: FC<StudentsItemProps> = () => (
  <div className="StudentsItem" data-testid="StudentsItem">
    StudentsItem Component
  </div>
);

export default StudentsItem;
