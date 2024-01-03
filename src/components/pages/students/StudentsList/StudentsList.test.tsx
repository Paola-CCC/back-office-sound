import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudentsList from './StudentsList';

describe('<StudentsList />', () => {
  test('it should mount', () => {
    render(<StudentsList />);
    
    const studentsList = screen.getByTestId('StudentsList');

    expect(studentsList).toBeInTheDocument();
  });
});