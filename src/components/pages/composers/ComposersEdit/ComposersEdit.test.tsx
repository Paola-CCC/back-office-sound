import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComposersEdit from './ComposersEdit';

describe('<ComposersEdit />', () => {
  test('it should mount', () => {
    render(<ComposersEdit />);
    
    const composersEdit = screen.getByTestId('ComposersEdit');

    expect(composersEdit).toBeInTheDocument();
  });
});