import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseDelete from './CourseDelete';

describe('<CourseDelete />', () => {
  test('it should mount', () => {
    render(<CourseDelete />);
    
    const courseDelete = screen.getByTestId('CourseDelete');

    expect(courseDelete).toBeInTheDocument();
  });
});