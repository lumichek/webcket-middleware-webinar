import { combineReducers } from "redux";
import { ordersReducer } from "./orders";

const reducer = combineReducers({
  orders: ordersReducer
});

export default reducer;