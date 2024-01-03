import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComposersAdd from './ComposersAdd';

describe('<ComposersAdd />', () => {
  test('it should mount', () => {
    render(<ComposersAdd />);
    
    const composersAdd = screen.getByTestId('ComposersAdd');

    expect(composersAdd).toBeInTheDocument();
  });
});