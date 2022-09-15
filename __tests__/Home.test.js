import React from 'react';
import {render} from '@testing-library/react-native';
import Home from '../screens/admin_screens/Home/Home';

test('render Home Component Properly', () => {
  render(<Home />);
});
