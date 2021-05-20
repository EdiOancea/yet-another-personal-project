import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const SIDEBAR_ITEMS_LIST = [
  [
    {label: 'Dashboard', route: '/dashboard', icon: <DashboardIcon />},
    {label: 'Quizzes', route: '/quizzes', icon: <AssessmentIcon />},
  ],
  [{label: 'Log Out', route: '/signin', icon: <ExitToAppIcon />}],
];
