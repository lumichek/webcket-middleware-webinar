export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface TableRow {
  id: number;
  text: string;
}

export type LiveTable = Array<TableRow>;

export enum LiveTableMessageType {
  DATA = 'data',
  INSERT = 'insert',
  DELETE = 'delete',
  UPDATE = 'update',
  MOVE = 'move'
}

export type Data = {
  type: LiveTableMessageType.DATA,
  data: LiveTable
}

export type Insert = {
  type: LiveTableMessageType.INSERT,
  data: {
      rows: Array<TableRow>,
      pos: number
  }
}

export type Update = {
  type: LiveTableMessageType.UPDATE,
  data: LiveTable
}

export type Delete = {
  type: LiveTableMessageType.DELETE,
  data: Array<number>
}

export type Move = {
  type: LiveTableMessageType.MOVE,
  data: Array<{from: number, to: number}>
}

export type LiveTableAction = Insert | Data | Delete | Update | Move;

export type LiveTableMessages = Array<LiveTableAction>;
