import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComposersItem from './ComposersItem';

describe('<ComposersItem />', () => {
  test('it should mount', () => {
    render(<ComposersItem />);
    
    const composersItem = screen.getByTestId('ComposersItem');

    expect(composersItem).toBeInTheDocument();
  });
});