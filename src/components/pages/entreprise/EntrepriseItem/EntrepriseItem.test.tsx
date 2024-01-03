import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EntrepriseItem from './EntrepriseItem';

describe('<EntrepriseItem />', () => {
  test('it should mount', () => {
    render(<EntrepriseItem />);
    
    const entrepriseItem = screen.getByTestId('EntrepriseItem');

    expect(entrepriseItem).toBeInTheDocument();
  });
});