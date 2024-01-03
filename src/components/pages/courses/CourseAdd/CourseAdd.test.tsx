import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseAdd from './CourseAdd';

describe('<CourseAdd />', () => {
  test('it should mount', () => {
    render(<CourseAdd />);
    
    const courseAdd = screen.getByTestId('CourseAdd');

    expect(courseAdd).toBeInTheDocument();
  });
});