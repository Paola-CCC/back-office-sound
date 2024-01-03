import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoursesList from './CoursesList';

describe('<CoursesList />', () => {
  test('it should mount', () => {
    render(<CoursesList />);
    
    const coursesList = screen.getByTestId('CoursesList');

    expect(coursesList).toBeInTheDocument();
  });
});