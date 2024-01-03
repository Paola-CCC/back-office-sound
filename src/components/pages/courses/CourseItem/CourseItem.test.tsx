import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseItem from './CourseItem';

describe('<CourseItem />', () => {
  test('it should mount', () => {
    render(<CourseItem />);
    
    const courseItem = screen.getByTestId('CourseItem');

    expect(courseItem).toBeInTheDocument();
  });
});