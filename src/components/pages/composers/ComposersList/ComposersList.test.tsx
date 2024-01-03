import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComposersList from './ComposersList';

describe('<ComposersList />', () => {
  test('it should mount', () => {
    render(<ComposersList />);
    
    const composersList = screen.getByTestId('ComposersList');

    expect(composersList).toBeInTheDocument();
  });
});