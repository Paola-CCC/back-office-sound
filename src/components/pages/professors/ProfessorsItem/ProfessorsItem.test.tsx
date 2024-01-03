import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfessorsItem from './ProfessorsItem';

describe('<ProfessorsItem />', () => {
  test('it should mount', () => {
    render(<ProfessorsItem />);
    
    const professorsItem = screen.getByTestId('ProfessorsItem');

    expect(professorsItem).toBeInTheDocument();
  });
});