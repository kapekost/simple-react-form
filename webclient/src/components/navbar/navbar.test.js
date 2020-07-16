import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './navbar';

test('renders learn react link', () => {
  const { getByText } = render(<Navbar />);

});
