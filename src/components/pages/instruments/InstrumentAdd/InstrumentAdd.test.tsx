import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstrumentAdd from './InstrumentAdd';

describe('<InstrumentAdd />', () => {
  test('it should mount', () => {
    render(<InstrumentAdd />);
    
    const instrumentAdd = screen.getByTestId('InstrumentAdd');

    expect(instrumentAdd).toBeInTheDocument();
  });
});