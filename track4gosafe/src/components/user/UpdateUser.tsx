import React, {useRef} from "react";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useState} from "react";
import {stateProps, User} from "../../interfaces/app.interface";
import {Toast} from "primereact/toast";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAction} from "../../actions/user.action";
import {RouteChildrenProps, useHistory} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "../../store/store";

const UpdateUser = ({match}: RouteChildrenProps) => {
    const toast = useRef(null);
    const dispatch = useAppDispatch();
    const state = useSelector(
        (state: { stateuser: stateProps }) => state.stateuser
    );

    const history = useHistory();
    const [user, setUser] = useState<User>({
        email: "",
        id: 0,
        identificationCard: "",
        name: "",
        phone: "",
    });

    useEffect(() => {
        setUser(state.userEdit);
        if (state.userEdit === null) {
            history.push("/");
            return;
        }
    }, []);

    const showError = () => {
        toast.current.show({
            severity: "error",
            summary: "Error en datos",
            detail: "Los datos están mál ingresados",
            life: 3000,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            user.name === "" ||
            user.email === "" ||
            user.phone === "" ||
            user.identificationCard === ""
        ) {
            showError();
            return;
        }
        //dispatch(updateUserAction(match.params["id"], user, state.lazyParams));
        dispatch(updateUserAction(match.params["id"], user)).then(user => {
            if (user){
                history.push("/");
            }
        });
    };


    return (
        <div className="p-grid p-mt-3 p-d-flex p-jc-center">
            <Toast ref={toast}/>
            <div className="p-col-6">
                <Card title="Actualizar usuario">
                    <div className="p-fluid">
                        <form onSubmit={handleSubmit}>
                            <div className="p-field">
                                <label htmlFor="identificationCard">Cédula</label>
                                <InputText
                                    id="identificationCard"
                                    maxLength={10}
                                    name="identificationCard"
                                    type="text"
                                    autoFocus
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
                                <InputText
                                    id="phone"
                                    maxLength={10}
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={user.phone}
                                />
                            </div>
                            <Button label="Actualizar"/>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UpdateUser;
