import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EntrepriseList from './EntrepriseList';

describe('<EntrepriseList />', () => {
  test('it should mount', () => {
    render(<EntrepriseList />);
    
    const entrepriseList = screen.getByTestId('EntrepriseList');

    expect(entrepriseList).toBeInTheDocument();
  });
});