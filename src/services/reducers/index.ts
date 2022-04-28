import { combineReducers } from "redux";
import { liveTableReducer } from "./live-table";

const reducer = combineReducers({
  liveTable: liveTableReducer
});

export default reducer;