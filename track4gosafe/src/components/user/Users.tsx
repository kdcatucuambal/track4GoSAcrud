import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction, deleteUserAction, getUpdateUserAction, setNullAlert } from '../../actions/user.action';
import { stateProps, User } from '../../interfaces/app.interface';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Users = () => {

    const dispatch = useDispatch();
    const state = useSelector((state: { stateuser: stateProps }) => state.stateuser);
    const history = useHistory();
    const match = useRouteMatch();
    const renderAux = useRef(0);

    useEffect(() => {
        const loadUsers = () => dispatch(getUsersAction());
        if (renderAux.current === 0) {
            loadUsers();
            renderAux.current = renderAux.current + 1;
        }

        if (state.alert === false) {
            showSuccess();
            dispatch(setNullAlert());
        }

    }, [state.alert]);

    const toast = useRef(null);

    const confirmDeleteUser = (user: User) => {
        confirm2(user);
    }

    const updateUser = (user: User) => {
        dispatch(getUpdateUserAction(user));
        history.push(`${match.path}updateuser/${user.identificationCard}`);
    }

    const accept = (id: string) => {
        dispatch(deleteUserAction(id));
        toast.current.show({ severity: 'warn', summary: 'Eliminado', detail: 'Usuario eliminado', life: 3000 });
    }

    // const reject = () => {
    //     toast.current.show({ severity: 'info', summary: 'Rechazado', detail: 'La acción fue rechazada', life: 3000 });
    // }

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Usuarios actualizados', life: 3000 });
    }

    const confirm2 = (user: User) => {
        confirmDialog({
            message: `¿Está seguro de eliminar a ${user.name}?`,
            header: 'ADVERTENCIA',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => accept(user.identificationCard),
        });
    };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const actionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" title={`Editar a ${rowData.name}`} className="p-button-success p-mr-2"
                    onClick={() => { updateUser(rowData) }} />
                <Button icon="pi pi-trash" title={`Eliminar a ${rowData.name}`} className="p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    }


    return (
        <div>

            <Toast ref={toast} />
            <div className="card">
                <DataTable
                    value={state.users} autoLayout
                    header="Listado de Usuarios" footer="CRUD REDUX" showGridlines
                    paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} loading={state.loading}>
                    <Column className="p-text-center" field="id" header="ID"></Column>
                    <Column className="p-text-center" field="identificationCard" header="Cédula"></Column>
                    <Column className="p-text-center" field="name" header="Usuario"></Column>
                    <Column className="p-text-center" field="phone" header="Teléfono"></Column>
                    <Column className="p-text-center" field="email" header="Email"></Column>
                    <Column className="p-text-center" body={actionBodyTemplate} header="Opciones"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Users;