import * as React from 'react';
import {useDispatch, useSelector} from '../../services/store';

import {ORDERS_CONNECT, ORDERS_DISCONNECT} from '../../services/reducers/orders';
import {WebsocketStatus} from '../../types';

export const ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

const Orders = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.orders);
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
      <h3 className='header'>All orders</h3>
      <p>
        Orders WS connection status: <span className={className}>{status}</span>
      </p>
      <div>
        <button className='button button--connect' onClick={connect} disabled={isDisconnected}>Connect</button>
        <button className='button button--disconnect' onClick={disconnect} disabled={!isDisconnected}>Disconnect</button>
      </div>
      <ul className='orders'>
        {
          data.map((order) => (
            <li className='order' key={order._id}>
              <div className='order_id'></div>
              {order.name}
              <span className='order_status'>
                {order.status}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Orders;


