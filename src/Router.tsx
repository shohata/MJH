import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './auth/Auth'
import Toppage from './auth/Toppage'
import Home from './Home'

const Router: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/signin' component={Toppage} />
          <Auth>
            <Switch>
              <Route exact={true} path="/" component={Home} />
            </Switch>
          </Auth>
        </Switch>
      </BrowserRouter>
  );
}

export default Router;
