export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_ERROR = "ADD_USER_ERROR";

export const START_DOWNLOAD_USERS = "START_DOWNLOAD_USERS";
export const START_DOWNLOAD_ERROR = "START_DOWNLOAD_ERROR";
export const START_DOWNLOAD_SUCCESS = "START_DOWNLOAD_SUCCESS";

export const GET_USER_DELETE = "GET_USER_DELETE";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_ERROR = "USER_DELETE_ERROR";

export const GET_USER_EDIT = "GET_USER_EDIT";
export const START_USER_EDIT = "START_USER_EDIT";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR";
export const ALERT_NULL = "ALERT_NULL";

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

export const SET_TOTAL_RECORDS = "SET_TOTAL_RECORDS";

export const SET_LAZY_PARAMS = "SET_LAZY_PARAMS";

export const SET_AUX_QUERY = "SET_AUX_QUERY";

export interface appAction {
    type: string;
    payload?: any;
}
