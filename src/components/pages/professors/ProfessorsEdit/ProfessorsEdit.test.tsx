import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfessorsEdit from './ProfessorsEdit';

describe('<ProfessorsEdit />', () => {
  test('it should mount', () => {
    render(<ProfessorsEdit />);
    
    const professorsEdit = screen.getByTestId('ProfessorsEdit');

    expect(professorsEdit).toBeInTheDocument();
  });
});