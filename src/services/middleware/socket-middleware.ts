import { Middleware } from 'redux';
import { RootState } from '../store';

export type TWsActionTypes = {
  wsConnect: string,
  wsDisconnect: string,
  wsSendMessage?: string,
  wsConnecting: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
}

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsSendMessage, onOpen,
        onClose, onError, onMessage, wsConnecting } = wsActions;

      if (wsConnect === action.type) {
        console.log('connect')
        url = action.payload;
        socket = new WebSocket(url);
        dispatch({type: wsConnecting});
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = (error) => {
          console.log('error')
          dispatch({type: onError, payload: JSON.stringify(error)});
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({type: onMessage, payload: parsedData});
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log('error')
            dispatch({type: onError, payload: event.code.toString()});
          }
          console.log('close')
          dispatch({type: onClose});
        };

        if (wsSendMessage && wsSendMessage === action.type) {
          console.log('send')
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect === action.type) {
          console.log('disconnect')
          socket.close();
          dispatch({type: onClose});
        }
      }

      next(action);
    };
  };
};
