import React from 'react';
import routes from '../routes';
import { BrowserRouter } from 'react-router-dom';

import { AppWrapper } from './layouts';

export default () => {
  return (
    <BrowserRouter>
      <AppWrapper>{routes}</AppWrapper>
    </BrowserRouter>
  );
};
