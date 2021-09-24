import {Dispatch} from "react";
import {clientAxios} from "../config/user.axios";
import {LazyParams, User} from "../interfaces/app.interface";
import {UserService as userSve} from "../services/user.service";
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
    SET_TOTAL_RECORDS,
    appAction,
    ALERT_NULL,
    SET_LAZY_PARAMS,
    SET_AUX_QUERY,
} from "../types";

export function getTotalRecordsAction() {
    return async (dispatch: Dispatch<appAction>) => {
        const total = await userSve.getTotalRecords();
        try {
            dispatch({
                type: SET_TOTAL_RECORDS,
                payload: total,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function setLazyParamsAction(lazyParams: LazyParams) {
    return async (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: SET_LAZY_PARAMS,
            payload: lazyParams,
        });
    };
}

export function getUsersAction(take: number, rows: number) {
    return async (dispatch: Dispatch<appAction>) => {
        console.log("RUn users action-> GET");
        dispatch({
            type: START_DOWNLOAD_USERS,
            payload: true,
        });
        try {
            const users = await userSve.getChunk(take, rows);
            dispatch({
                type: START_DOWNLOAD_SUCCESS,
                payload: users,
            });
        } catch (error) {
            dispatch({
                type: START_DOWNLOAD_ERROR,
                payload: true,
            });
        }
    };
}

export function getUsersMatchesAction(query: string) {
    return async (dispatch: Dispatch<appAction>)=>{
        dispatch({
            type: START_DOWNLOAD_USERS,
            payload: true,
        });

        try {
            const users = await userSve.getMatches(query);
            dispatch({
                type: START_DOWNLOAD_SUCCESS,
                payload: users
            })
            return Promise.resolve(true);
        }catch (e) {
            dispatch({
                type: START_DOWNLOAD_ERROR,
                payload: true,
            });
            return Promise.reject(null);
        }
    }
}



export function deleteUserAction(id: string) {
    return async (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: GET_USER_DELETE,
            payload: id,
        });

        try {
            const deleted = await userSve.delete(id);
            dispatch({
                type: USER_DELETE_SUCCESS,
            });
            return Promise.resolve(deleted);
        } catch (error) {
            dispatch({
                type: USER_DELETE_ERROR,
                payload: true,
            });
            return Promise.reject(null);
        }
    };
}

export function createUserAction(user: User) {
    return async (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: ADD_USER,
        });

        try {
            const userCreated = await userSve.create(user);
            dispatch({
                type: ADD_USER_SUCCESS,
            });
            return Promise.resolve(userCreated);
        } catch (error) {
            dispatch({
                type: ADD_USER_ERROR,
                payload: true,
            });
            return Promise.reject(null);
        }
    };
}

export function getUpdateUserAction(user: User) {
    return async (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: GET_USER_EDIT,
            payload: user,
        });
    };
}

export function updateUserAction(
    id: string,
    user: User
) {
    return async (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: START_USER_EDIT,
        });

        try {
            const userUpdated = await userSve.update(user, id);

            dispatch({
                type: USER_EDIT_SUCCESS,
            });
            return Promise.resolve(userUpdated);
        } catch (error) {
            dispatch({
                type: USER_EDIT_ERROR,
                payload: true,
            });
            return Promise.reject(null);
        }
    };
}


export function setNullAlert() {
    console.log("ALERT NULL ACTION");
    return (dispatch: Dispatch<appAction>) => {
        dispatch({
            type: ALERT_NULL,
        });
    };
}
