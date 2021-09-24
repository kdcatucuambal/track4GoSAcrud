import { stateProps } from "../interfaces/app.interface";
import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  GET_USER_DELETE,
  GET_USER_EDIT,
  START_DOWNLOAD_ERROR,
  START_DOWNLOAD_SUCCESS,
  START_DOWNLOAD_USERS,
  START_USER_EDIT,
  USER_DELETE_SUCCESS,
  USER_EDIT_ERROR,
  USER_EDIT_SUCCESS,
  SET_TOTAL_RECORDS,
  appAction,
  ALERT_NULL,
  SET_LAZY_PARAMS,
  SET_AUX_QUERY,
} from "../types";

const defaultState: stateProps = {
  users: [],
  error: null,
  loading: false,
  userDelete: null,
  userEdit: null,
  alert: null,
  totalRecords: 0,
  lazyParams: {
    first: 0,
    page: 0,
    rows: 5,
  },
  auxQuery: false,
};

export default function userReducer(
  state: stateProps = defaultState,
  action: appAction
): stateProps {
  switch (action.type) {
    case START_DOWNLOAD_USERS:
    case START_USER_EDIT:
    case ADD_USER:
      return {
        ...state,
        loading: true,
      };
    case START_DOWNLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case START_DOWNLOAD_ERROR:
    case USER_EDIT_ERROR:
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        alert: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        userDelete: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        alert: false,
        users: action.payload,
      };
    case ALERT_NULL:
      console.log("Alert null reducer");
      return {
        ...state,
        alert: null,
      };
    case GET_USER_DELETE:
      return {
        ...state,
        userDelete: action.payload,
      };
    case GET_USER_EDIT:
      return {
        ...state,
        userEdit: action.payload,
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        userEdit: null,
        alert: false,
        loading: false
      };
    case SET_TOTAL_RECORDS:
      return {
        ...state,
        totalRecords: action.payload,
      };
    case SET_LAZY_PARAMS:
      return {
        ...state,
        lazyParams: { ...action.payload },
      };
    case SET_AUX_QUERY:
      return {
        ...state,
        auxQuery: action.payload,
      };
    default:
      return state;
  }
}
