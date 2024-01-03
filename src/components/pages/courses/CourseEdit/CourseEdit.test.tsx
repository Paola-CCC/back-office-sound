import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseEdit from './CourseEdit';

describe('<CourseEdit />', () => {
  test('it should mount', () => {
    render(<CourseEdit />);
    
    const courseEdit = screen.getByTestId('CourseEdit');

    expect(courseEdit).toBeInTheDocument();
  });
});