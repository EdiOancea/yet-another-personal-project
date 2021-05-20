import React from 'react';
import {Route} from 'react-router-dom';

import {useCorrectToken, useCorrectUserTypes} from 'customHooks/routes';

const CaregiverRoute = ({types, ...rest}) => {
  useCorrectToken();
  useCorrectUserTypes(types);

  return <Route {...rest} />;
};

export default CaregiverRoute;
