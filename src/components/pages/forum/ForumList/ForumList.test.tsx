import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForumList from './ForumList';

describe('<ForumList />', () => {
  test('it should mount', () => {
    render(<ForumList />);
    
    const forumList = screen.getByTestId('ForumList');

    expect(forumList).toBeInTheDocument();
  });
});