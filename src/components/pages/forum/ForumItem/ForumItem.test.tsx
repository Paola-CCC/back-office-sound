import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForumItem from './ForumItem';

describe('<ForumItem />', () => {
  test('it should mount', () => {
    render(<ForumItem />);
    
    const forumItem = screen.getByTestId('ForumItem');

    expect(forumItem).toBeInTheDocument();
  });
});