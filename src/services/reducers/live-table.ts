import { LiveTable, LiveTableMessages, WebsocketStatus } from '../../types/live-table';
import { liveTableUpdate } from '../utils/live-table-utils';

export const LIVE_TABLE_CONNECT = "LIVE_TABLE_CONNECT";
export const LIVE_TABLE_DISCONNECT = "LIVE_TABLE_DISCONNECT";
export const LIVE_TABLE_WS_CONNECTING = "LIVE_TABLE_WS_CONNECTING";
export const LIVE_TABLE_WS_OPEN = "LIVE_TABLE_WS_OPEN";
export const LIVE_TABLE_WS_CLOSE = "LIVE_TABLE_WS_CLOSE";
export const LIVE_TABLE_WS_MESSAGE = "LIVE_TABLE_WS_MESSAGE";
export const LIVE_TABLE_WS_ERROR = "LIVE_TABLE_WS_ERROR";

export type TConnect = {
  readonly type: typeof LIVE_TABLE_CONNECT;
  readonly payload: string; // url
};
export type TDisconnect = {
  readonly type: typeof LIVE_TABLE_DISCONNECT;
};
export type TWsConnecting = {
  readonly type: typeof LIVE_TABLE_WS_CONNECTING;
};
export type TWsOpen = {
  readonly type: typeof LIVE_TABLE_WS_OPEN;
};
export type TWsClose = {
  readonly type: typeof LIVE_TABLE_WS_CLOSE;
};
export type TWsMessage = {
  readonly type: typeof LIVE_TABLE_WS_MESSAGE;
  readonly payload: LiveTableMessages;
};
export type TWsError = {
  readonly type: typeof LIVE_TABLE_WS_ERROR;
  readonly payload: string;
};

export type TLiveTableActions = TConnect
  | TDisconnect
  | TWsConnecting
  | TWsOpen
  | TWsClose
  | TWsMessage
  | TWsError;

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

export const liveTableReducer = (
  state = initialState,
  action: TLiveTableActions
): LiveTableStore => {
  switch (action.type) {
    case LIVE_TABLE_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    }
    case LIVE_TABLE_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectionError: ''
      };
    }
    case LIVE_TABLE_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      };
    }
    case LIVE_TABLE_WS_ERROR: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        connectionError: action.payload
      };
    }
    case LIVE_TABLE_WS_MESSAGE: {
      return {
        ...state,
        table: liveTableUpdate(state.table, action.payload)
      };
    }
    default: {
      return state;
    }
  }
};
