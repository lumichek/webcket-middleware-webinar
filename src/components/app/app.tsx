import * as React from 'react';
import Orders from '../orders/orders';
import { Route, Switch } from 'react-router';

const App = () => {
  return (
    <Switch>
      <Route path="/orders" exact>
        <Orders />
      </Route>
    </Switch>
  );
}

export default App;


