import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstrumentsList from './InstrumentsList';

describe('<InstrumentsList />', () => {
  test('it should mount', () => {
    render(<InstrumentsList />);
    
    const instrumentsList = screen.getByTestId('InstrumentsList');

    expect(instrumentsList).toBeInTheDocument();
  });
});