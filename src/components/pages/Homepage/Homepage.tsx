import React, { FC } from 'react';
import './Homepage.scss';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => (
  <div className="Homepage" data-testid="Homepage">
    Homepage Component
  </div>
);

export default Homepage;
