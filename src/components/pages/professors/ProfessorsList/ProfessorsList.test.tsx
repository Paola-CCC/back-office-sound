import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfessorsList from './ProfessorsList';

describe('<ProfessorsList />', () => {
  test('it should mount', () => {
    render(<ProfessorsList />);
    
    const professorsList = screen.getByTestId('ProfessorsList');

    expect(professorsList).toBeInTheDocument();
  });
});