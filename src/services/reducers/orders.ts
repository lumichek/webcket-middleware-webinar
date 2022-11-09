import { WebsocketStatus, TOrder } from "../../types";

export const ORDERS_CONNECT = "ORDERS_CONNECT";
export const ORDERS_DISCONNECT = "ORDERS_DISCONNECT";
export const ORDERS_WS_CONNECTING = "ORDERS_WS_CONNECTING";
export const ORDERS_WS_OPEN = "ORDERS_WS_OPEN";
export const ORDERS_WS_CLOSE = "ORDERS_WS_CLOSE";
export const ORDERS_WS_MESSAGE = "ORDERS_WS_MESSAGE"; // getting message
export const ORDERS_WS_ERROR = "ORDERS_WS_ERROR";

export type TConnect = {
  readonly type: typeof ORDERS_CONNECT;
  readonly payload: string; // url
};
export type TDisconnect = {
  readonly type: typeof ORDERS_DISCONNECT;
};
export type TWsConnecting = {
  readonly type: typeof ORDERS_WS_CONNECTING;
};
export type TWsOpen = {
  readonly type: typeof ORDERS_WS_OPEN;
};
export type TWsClose = {
  readonly type: typeof ORDERS_WS_CLOSE;
};
export type TWsMessage = {
  readonly type: typeof ORDERS_WS_MESSAGE;
  readonly payload: {
    orders: TOrder[];
  };
};
export type TWsError = {
  readonly type: typeof ORDERS_WS_ERROR;
  readonly payload: string;
};

export type TOrdersActions = TConnect
  | TDisconnect
  | TWsConnecting
  | TWsOpen
  | TWsClose
  | TWsMessage
  | TWsError;

export type OrdersStore = {
  status: WebsocketStatus,
  connectionError: string,
  data: TOrder[]
}

const initialState: OrdersStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: []
};

export const ordersReducer = (
  state = initialState,
  action: TOrdersActions
): OrdersStore => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    }
    case ORDERS_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectionError: ''
      };
    }
    case ORDERS_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      };
    }
    case ORDERS_WS_ERROR: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        connectionError: action.payload
      };
    }
    case ORDERS_WS_MESSAGE: {
      console.log(action)
      return {
        ...state,
        data: action.payload.orders
      };
    }
    default: {
      return state;
    }
  }
};
