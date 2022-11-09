import { applyMiddleware, createStore } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware/socket-middleware';

import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_ERROR,
  TOrdersActions
} from "./reducers/orders";

const ordersWsActions = {
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE
};

const ordersWsMiddleware = socketMiddleware(ordersWsActions);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      ordersWsMiddleware
    )
  )
);

export type TApplicationActions = TOrdersActions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
