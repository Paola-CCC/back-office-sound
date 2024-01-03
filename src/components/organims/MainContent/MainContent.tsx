import React, { FC } from 'react';
import './MainContent.scss';
import RoutesNavigation from '../../../routes/RoutesNavigation';

interface MainContentProps {}

const MainContent: FC<MainContentProps> = () => (
  <main>
    <RoutesNavigation />
  </main>
);

export default MainContent;
