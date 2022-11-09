import * as React from 'react';
import Orders from '../orders/orders';
import { Route, Switch } from 'react-router';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/reducers/ingredients';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  });

  return (
    <Switch>
      <Route path="/orders" exact>
        <Orders />
      </Route>
    </Switch>
  );
}

export default App;


