import React, { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from 'react';
import { stateProps, User } from '../../interfaces/app.interface';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '../../actions/user.action';
import { useHistory } from 'react-router-dom';


const NewUser = () => {

    const toast = useRef(null);
    const dispatch = useDispatch();
    const state = useSelector((state: { stateuser: stateProps }) => state.stateuser);

    const history = useHistory();
    const [user, setUser] = useState<User>({
        email: "",
        id: 0,
        identificationCard: "",
        name: "",
        phone: ""
    });

    const showError = (detail: string) => {
        toast.current.show({ severity: 'error', summary: 'Error en datos', detail, life: 3000 });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.name === "" ||
            user.email === "" ||
            user.phone === "" ||
            user.identificationCard === "") {
            showError('Los datos están mal ingresados');
            return;
        }

        //check user identificationCard
        const checkIdCard = state.users.some(
            (u: User) => u.identificationCard === user.identificationCard);

        if (checkIdCard) {
            showError('La cédula ya está en uso');
            return;
        }
        dispatch(createUserAction(user));
        history.push("/");
    }

    return (
        <div className="p-grid p-mt-3 p-d-flex p-jc-center">
            <Toast ref={toast} />
            <div className="p-col-6">
                <Card title="Nuevo usuario">
                    <div className="p-fluid">
                        <form onSubmit={handleSubmit}>
                            <div className="p-field">
                                <label htmlFor="identificationCard">Cédula</label>
                                <InputText autoFocus id="identificationCard"
                                    maxLength={10} name="identificationCard"
                                    type="text"
                                    onChange={handleChange}
                                    value={user.identificationCard}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="name">Nombre</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={user.name}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="phone">Teléfono</label>
                                <InputText id="phone"
                                    maxLength={10}
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={user.phone}
                                />
                            </div>
                            <Button label="Guardar"></Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NewUser;