import { applyMiddleware, createStore } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import rootReducer from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import {
  LIVE_TABLE_CONNECT,
  LIVE_TABLE_DISCONNECT,
  LIVE_TABLE_WS_CONNECTING,
  LIVE_TABLE_WS_OPEN,
  LIVE_TABLE_WS_CLOSE,
  LIVE_TABLE_WS_MESSAGE,
  LIVE_TABLE_WS_ERROR,
  TLiveTableActions
} from "./reducers/live-table";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const liveTableWsActions = {
  wsConnect: LIVE_TABLE_CONNECT,
  wsDisconnect: LIVE_TABLE_DISCONNECT,
  wsConnecting: LIVE_TABLE_WS_CONNECTING,
  onOpen: LIVE_TABLE_WS_OPEN,
  onClose: LIVE_TABLE_WS_CLOSE,
  onError: LIVE_TABLE_WS_ERROR,
  onMessage: LIVE_TABLE_WS_MESSAGE
};

const liveTableWsMiddleware = socketMiddleware(liveTableWsActions);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      liveTableWsMiddleware
    )
  )
);

export type TApplicationActions = TLiveTableActions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
