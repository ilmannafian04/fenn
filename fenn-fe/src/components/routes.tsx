import React, { ReactNode } from 'react';

import NewPoll from './polls/NewPoll';

interface IRouteConfig {
  path: string;
  el: ReactNode;
}

const routes: IRouteConfig[] = [
  {
    path: '/',
    el: <NewPoll />,
  },
];

export default routes;
