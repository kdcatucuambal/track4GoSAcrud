
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
    USER_DELETE_ERROR,
    USER_DELETE_SUCCESS,
    USER_EDIT_ERROR,
    USER_EDIT_SUCCESS,
    HIDE_ALERT,
    SHOW_ALERT,
    productAction,
    ALERT_NULL

} from "../types";

const defaultState: stateProps = {
    users: [],
    error: null,
    loading: false,
    userDelete: null,
    userEdit: null,
    alert: null
}

export default function userReducer(
    state: stateProps = defaultState,
    action: productAction): stateProps {
    switch (action.type) {
        case START_DOWNLOAD_USERS:
        case START_USER_EDIT:
        case ADD_USER:
            return {
                ...state,
                loading: true
            }
        case START_DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case START_DOWNLOAD_ERROR:
        case USER_EDIT_ERROR:
        case ADD_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                alert: true
            }
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.identificationCard !== state.userDelete),
                userDelete: null
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                alert: false,
                users: action.payload
            }
        case ALERT_NULL:
            return {
                ...state,
                alert: null
            }
        case GET_USER_DELETE:
            return {
                ...state,
                userDelete: action.payload
            }
        case GET_USER_EDIT:
            return {
                ...state,
                userEdit: action.payload
            }
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                userEdit: null,
                loading: false,
                users: action.payload,
                alert: false
            }
        default:
            return state;
    }

}