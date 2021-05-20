import React from 'react';

import {PageTitle} from 'components';
import DrawerWrapper from 'features/drawer/Drawer';

const DashboardPage = () => (
  <DrawerWrapper>
    <PageTitle title="Dashboard" />
  </DrawerWrapper>
);

export default DashboardPage;
