import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getUsersAction,
    deleteUserAction,
    getUpdateUserAction,
    setNullAlert,
    getTotalRecordsAction,
    setLazyParamsAction,
} from "../../actions/user.action";
import {stateProps, User} from "../../interfaces/app.interface";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {useHistory, useRouteMatch} from "react-router-dom";
import InputSearch from "./InputSearch";
import {useAppDispatch} from "../../store/store";

const Users = () => {
    const dispatch = useAppDispatch();
    const [refresh, setRefresh] = useState(true);

    const state = useSelector(
        (state: { stateuser: stateProps }) => state.stateuser
    );
    const history = useHistory();
    const match = useRouteMatch();


    useEffect(() => {
        console.log(state);
        const loadUsersF = () => dispatch(getUsersAction(
            state.lazyParams.first, state.lazyParams.rows));
        const setNullAlertF = () => dispatch(setNullAlert);
        const getTotalRecordsF = () => dispatch(getTotalRecordsAction());
        getTotalRecordsF();
        loadUsersF();

        if (state.alert===false){
            showSuccess();
            setNullAlertF();
        }


    }, [state.lazyParams.page, refresh]);

    const toast = useRef(null);
    const dt = useRef<DataTable>(null);

    const confirmDeleteUser = (user: User) => {
        confirm2(user);
    };

    const onPage = (event) => {
        const setLazyF = () => dispatch(setLazyParamsAction({...event}));
        setLazyF();
    };

    const updateUser = (user: User) => {
        dispatch(getUpdateUserAction(user));
        history.push(`${match.path}updateuser/${user.identificationCard}`);
    };

    const accept = (id: string) => {
        dispatch(deleteUserAction(id)).then(r => {
            if (r) {
                toast.current.show({
                    severity: "warn",
                    summary: "Eliminado",
                    detail: "Usuario eliminado",
                    life: 3000,
                });
                setRefresh(!refresh);
            }
        })

    };

    const showSuccess = () => {
        toast.current.show({
            severity: "success",
            summary: "Exitoso",
            detail: "Usuarios actualizados",
            life: 3000,
        });
    };

    const confirm2 = (user: User) => {
        confirmDialog({
            message: `¿Está seguro de eliminar a ${user.name}?`,
            header: "ADVERTENCIA",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => accept(user.identificationCard),
        });
    };

    const paginatorLeft = (
        <Button type="button" icon="pi pi-refresh" className="p-button-text"/>
    );
    const paginatorRight = (
        <Button type="button" icon="pi pi-cloud" className="p-button-text"/>
    );

    const header = (
        <div className="table-header">
            <InputSearch/>
        </div>
    );

    const actionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    title={`Editar a ${rowData.name}`}
                    className="p-button-success p-mr-2"
                    onClick={() => {
                        updateUser(rowData);
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    title={`Eliminar a ${rowData.name}`}
                    className="p-button-danger"
                    onClick={() => confirmDeleteUser(rowData)}
                />
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast}/>
            <div className="card">
                <DataTable
                    ref={dt}
                    value={state.users}
                    lazy
                    autoLayout
                    header={header}
                    footer="CRUD REDUX"
                    showGridlines
                    paginator
                    stripedRows
                    first={state.lazyParams.first}
                    rows={state.lazyParams.rows}
                    totalRecords={state.totalRecords}
                    onPage={onPage}
                    loading={state.loading}
                    emptyMessage={<h3>No hay usuarios. ¡Crea tu primer usuario!</h3>}
                >
                    <Column className="p-text-center" field="id" header="ID"/>
                    <Column
                        className="p-text-center"
                        field="identificationCard"
                        header="Cédula"
                    />
                    <Column
                        className="p-text-center"
                        field="name"
                        header="Usuario"
                    />
                    <Column
                        className="p-text-center"
                        field="phone"
                        header="Teléfono"
                    />
                    <Column
                        className="p-text-center"
                        field="email"
                        header="Email"
                    />
                    <Column
                        className="p-text-center"
                        body={actionBodyTemplate}
                        header="Opciones"
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default Users;
