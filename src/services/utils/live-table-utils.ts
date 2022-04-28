import {
  LiveTable,
  LiveTableMessageType,
  LiveTableMessages,
  Insert as LiveTableInsertAction,
  Delete as LiveTableDeleteAction,
  Update as LiveTableUpdateAction,
  Move as LiveTableMoveAction
} from '../../types/live-table';

const insertData = (table: LiveTable, message: LiveTableInsertAction): LiveTable => {
  return [
    ...table.slice(0, message.data.pos),
    ...message.data.rows,
    ...table.slice(message.data.pos)
  ]
}

const deleteData = (table: LiveTable, message: LiveTableDeleteAction): LiveTable => {
  return table.filter(({id}) => !message.data.includes(id));
}

const updateData = (table: LiveTable, message: LiveTableUpdateAction): LiveTable => {
    return table.map(row => {
        const index = message.data.findIndex((updatedRow) => updatedRow.id === row.id);
        if (index !== -1) {
            return message.data[index];
        }
        return row;
    });
}

const moveData = (prevTable: LiveTable, message: LiveTableMoveAction): LiveTable => {
    const table = [...prevTable];
    message.data.forEach((move) => {
        table.splice(move.to, 0, table.splice(move.from, 1)[0]);
    });
    return table;
}

export const liveTableUpdate = (prevTable: LiveTable, messages: LiveTableMessages): LiveTable => {
  let table = prevTable;
  messages.forEach((message) => {
    switch (message.type) {
      case LiveTableMessageType.DATA:
        table = message.data;
        break;
      case LiveTableMessageType.INSERT:
        table = insertData(table, message);
        break;
      case LiveTableMessageType.DELETE:
        table = deleteData(table, message);
        break;
      case LiveTableMessageType.UPDATE:
        table = updateData(table, message);
        break;
      case LiveTableMessageType.MOVE:
        table = moveData(table, message);
        break;
    }
  });

  return table;
}
