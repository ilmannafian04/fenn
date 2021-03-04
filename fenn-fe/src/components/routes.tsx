import React, { ReactNode } from 'react';

import NewPoll from './polls/NewPoll';
import FillPoll from './polls/FillPoll';

interface IRouteConfig {
  path: string;
  el: ReactNode;
  exact?: boolean;
}

const routes: IRouteConfig[] = [
  {
    path: '/:pollId',
    el: <FillPoll />,
  },
  {
    path: '/',
    el: <NewPoll />,
    exact: true,
  },
];

export default routes;
