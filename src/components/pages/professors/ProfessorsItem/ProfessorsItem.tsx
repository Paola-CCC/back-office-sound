import React, { FC } from 'react';
import './ProfessorsItem.scss';

interface ProfessorsItemProps {}

const ProfessorsItem: FC<ProfessorsItemProps> = () => (
  <div className="ProfessorsItem" data-testid="ProfessorsItem">
    ProfessorsItem Component
  </div>
);

export default ProfessorsItem;
