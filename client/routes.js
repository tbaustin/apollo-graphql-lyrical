import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SongList } from './components/containers';
import { SongCreate } from './components/crud';

const routes = (
  <Switch>
    <Route path="/songs/new" component={SongCreate} />
    <Route path="/" component={SongList} />
  </Switch>
);

export default routes;
