import { LiveTable, LiveTableMessages, WebsocketStatus } from '../../types/live-table';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { liveTableUpdate } from '../utils/live-table-utils';

export const connect = createAction<string, 'LIVE_TABLE_CONNECT'>('LIVE_TABLE_CONNECT');
export const disconnect = createAction('LIVE_TABLE_DISCONNECT');
export const wsConnecting = createAction('LIVE_TABLE_WS_CONNECTING');
export const wsOpen = createAction('LIVE_TABLE_WS_OPEN');
export const wsClose = createAction('LIVE_TABLE_WS_CLOSE');
export const wsMessage = createAction<LiveTableMessages, 'LIVE_TABLE_WS_MESSAGE'>('LIVE_TABLE_WS_MESSAGE');
export const wsError = createAction<string, 'LIVE_TABLE_WS_ERROR'>('LIVE_TABLE_WS_ERROR');

export type TLiveTableActions = ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;

export type LiveTableStore = {
  status: WebsocketStatus,
  connectionError: string,
  table: LiveTable
}

const initialState: LiveTableStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  table: []
};

export const liveTableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.table = liveTableUpdate(state.table, action.payload)
    })
});
