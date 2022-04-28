import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';

export type TWsActionTypes<M = any, S = any> = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<S>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<M>,
}

export const socketMiddleware = <M, S>(wsActions: TWsActionTypes<M, S>): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsSendMessage, onOpen,
        onClose, onError, onMessage, wsConnecting } = wsActions;

      if (wsConnect.match(action)) {
        console.log('connect');
        url = action.payload;
        socket = new WebSocket(url);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (error) => {
          console.log('error');
          dispatch(onError(JSON.stringify(error)));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log('error');
            dispatch(onError(event.code.toString()));
          }
          console.log('close');
          dispatch(onClose());
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          console.log('send');
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          console.log('disconnect');
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
