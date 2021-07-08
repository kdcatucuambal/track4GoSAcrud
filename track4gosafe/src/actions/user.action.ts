import { Dispatch } from "react";
import { clientAxios } from "../config/user.axios";
import { User } from "../interfaces/app.interface";
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
    ALERT_NULL,

} from "../types";

export function getUsersAction() {
    return async (dispatch: Dispatch<productAction>) => {
        dispatch({
            type: START_DOWNLOAD_USERS,
            payload: true
        })

        try {
            const response = await clientAxios.get("/users");
            const users: User[] = response.data;
            dispatch({
                type: START_DOWNLOAD_SUCCESS,
                payload: users
            })
        } catch (error) {
            dispatch({
                type: START_DOWNLOAD_ERROR,
                payload: true
            })

        }
    }
}

export function deleteUserAction(id: string) {
    return async (dispatch: Dispatch<productAction>) => {
        dispatch({
            type: GET_USER_DELETE,
            payload: id
        });

        try {
            const response = await clientAxios.delete(`/users/${id}`);
            console.log(response);
            // const { deleted } = response.data;
            dispatch({
                type: USER_DELETE_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: USER_DELETE_ERROR,
                payload: true
            })
        }
    }
}

export function createUserAction(user: User) {
    return async (dispatch: Dispatch<productAction>) => {
        dispatch({
            type: ADD_USER
        });

        try {
            await clientAxios.post('/users', user);
            const response = await clientAxios.get("/users");
            const users: User[] = response.data;
            dispatch({
                type: ADD_USER_SUCCESS,
                payload: users
            })
        } catch (error) {
            dispatch({
                type: ADD_USER_ERROR,
                payload: true
            })
        }
    }

}

export function getUpdateUserAction(user: User) {
    return async (dispatch: Dispatch<productAction>) => {
        dispatch({
            type: GET_USER_EDIT,
            payload: user
        });
    }

}

export function updateUserAction(id: string, user: User) {
    return async (dispatch: Dispatch<productAction>) => {
      
        dispatch({
            type: START_USER_EDIT,
        });

        try {
            await clientAxios.put(`users/${id}`, user);
            const response = await clientAxios.get("/users");
            const users: User[] = response.data;
            dispatch({
                type: USER_EDIT_SUCCESS,
                payload: users
            });
        } catch (error) {
            dispatch({
                type: USER_EDIT_ERROR,
                payload: true
            });
        }
    }
}

export function setNullAlert() {
    return async (dispatch: Dispatch<productAction>) => {
        dispatch({
            type: ALERT_NULL
        })

    }
}

