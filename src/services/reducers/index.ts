import { combineReducers } from "redux";
import { ordersReducer } from "./orders";
import { ingredientsReducer } from "./ingredients";

const reducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

export default reducer;