import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfessorsAdd from './ProfessorsAdd';

describe('<ProfessorsAdd />', () => {
  test('it should mount', () => {
    render(<ProfessorsAdd />);
    
    const professorsAdd = screen.getByTestId('ProfessorsAdd');

    expect(professorsAdd).toBeInTheDocument();
  });
});