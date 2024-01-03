import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainContent from './MainContent';

describe('<MainContent />', () => {
  test('it should mount', () => {
    render(<MainContent />);
    
    const mainContent = screen.getByTestId('MainContent');

    expect(mainContent).toBeInTheDocument();
  });
});