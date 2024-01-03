import React, { FC } from 'react';
import './EntrepriseItem.scss';

interface EntrepriseItemProps {}

const EntrepriseItem: FC<EntrepriseItemProps> = () => (
  <div className="EntrepriseItem" data-testid="EntrepriseItem">
    EntrepriseItem Component
  </div>
);

export default EntrepriseItem;
