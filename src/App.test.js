import React from 'react';
import { render } from '@testing-library/react';
import View from './components/View';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
