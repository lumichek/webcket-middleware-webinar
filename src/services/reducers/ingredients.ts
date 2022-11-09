import { TIngredient } from "../../types";
import { getIngredients as getIngredientsApi } from "../../utils";
import { AppThunk } from "../store";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: string;
};

export const getIngredients = (): AppThunk => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  return getIngredientsApi()
    .then((ingredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};

export type TGetIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;

export type IngredientsStore = {
  data: TIngredient[];
  isLoading: boolean;
  error: string;
}

const initialState: IngredientsStore = {
  data: [],
  isLoading: false,
  error: '',
};

export const ingredientsReducer = (
  state = initialState,
  action: TGetIngredientsActions
): IngredientsStore => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: '',
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
