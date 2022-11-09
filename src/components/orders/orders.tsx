import * as React from 'react';
import {useDispatch, useSelector} from '../../services/store';

import {ORDERS_CONNECT, ORDERS_DISCONNECT} from '../../services/reducers/orders';
import {WebsocketStatus} from '../../types';

export const ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

const Orders = () => {
  const dispatch = useDispatch();
  const { data: orders, status } = useSelector(state => state.orders);
  const { data: ingredients } = useSelector(state => state.ingredients);
  const isDisconnected = status !== WebsocketStatus.OFFLINE;

  const connect = () => dispatch({type: ORDERS_CONNECT, payload: ORDERS_SERVER_URL});
  const disconnect = () => dispatch({type: ORDERS_DISCONNECT});

  let className = 'status';

  switch (status) {
    case WebsocketStatus.ONLINE:
      className += ' status--online';
      break;
    case WebsocketStatus.OFFLINE:
      className += ' status--offline';
      break;
    case WebsocketStatus.CONNECTING:
      className += ' status--connecting';
      break;
  }

  return (
    <div className='app'>
      <h3 className='header'>Orders</h3>
      <p>
        WS connection status: <span className={className}>{status}</span>
      </p>
      <div>
        <button className='button button--connect' onClick={connect} disabled={isDisconnected}>Connect</button>
        <button className='button button--disconnect' onClick={disconnect} disabled={!isDisconnected}>Disconnect</button>
      </div>
      <ul className='orders'>
        {
          orders.map((order) => (
            <li className='order' key={order._id}>
              {order.name}
              <div className='ingredients'>
                {ingredients
                  .filter(({_id: id}) => order.ingredients.includes(id))
                  .map((ingredient) => (
                    <img
                      key={ingredient._id}
                      src={ingredient.image}
                      className='ingredient_image'
                      alt='Ing img'
                    />
                  ))}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Orders;


