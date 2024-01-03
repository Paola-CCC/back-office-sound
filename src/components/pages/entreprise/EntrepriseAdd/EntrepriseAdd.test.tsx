import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EntrepriseAdd from './EntrepriseAdd';

describe('<EntrepriseAdd />', () => {
  test('it should mount', () => {
    render(<EntrepriseAdd />);
    
    const entrepriseAdd = screen.getByTestId('EntrepriseAdd');

    expect(entrepriseAdd).toBeInTheDocument();
  });
});