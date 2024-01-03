import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EntrepriseEdit from './EntrepriseEdit';

describe('<EntrepriseEdit />', () => {
  test('it should mount', () => {
    render(<EntrepriseEdit />);
    
    const entrepriseEdit = screen.getByTestId('EntrepriseEdit');

    expect(entrepriseEdit).toBeInTheDocument();
  });
});