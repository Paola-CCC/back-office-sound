import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CategoriesAdd from './CategoriesAdd';

describe('<CategoriesAdd />', () => {
  test('it should mount', () => {
    render(<CategoriesAdd />);
    
    const categoriesAdd = screen.getByTestId('CategoriesAdd');

    expect(categoriesAdd).toBeInTheDocument();
  });
});