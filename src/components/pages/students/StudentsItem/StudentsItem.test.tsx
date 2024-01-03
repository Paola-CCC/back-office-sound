import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudentsItem from './StudentsItem';

describe('<StudentsItem />', () => {
  test('it should mount', () => {
    render(<StudentsItem />);
    
    const studentsItem = screen.getByTestId('StudentsItem');

    expect(studentsItem).toBeInTheDocument();
  });
});