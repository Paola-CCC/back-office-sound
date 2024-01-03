import React from 'react';

interface HeadingProps  {
  size: 'niv1' | 'niv2' | 'niv3' | 'niv4' | 'niv5' | 'niv6';
  text: string;
}

export const Heading: React.FC<HeadingProps> = ({ size, text, ...props }) => {
  const elements: Record<string, string> = {
    niv1: 'h1',
    niv2: 'h2',
    niv3: 'h3',
    niv4: 'h4',
    niv5: 'h5',
    niv6: 'h6',
  };

  return React.createElement(elements[size], props, text);
};