import {InputText} from "primereact/inputtext";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersAction, getUsersMatchesAction} from "../../actions/user.action";
import {useAppDispatch} from "../../store/store";


const InputSearch = () => {
    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();
    const renderAux = useRef(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useEffect(() => {
        if (query.trim().length < 3 || renderAux.current === 0) {
            renderAux.current = renderAux.current + 1;
            return;
        }
        const fnUsersMatches = async (query: string) => dispatch(getUsersMatchesAction(query));
        let timeOutId = setTimeout(async () => {
            await fnUsersMatches(query);
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [query]);

    return (
        <Fragment>
      <span className="p-input-icon-left">
        <i className="pi pi-search"/>
        <InputText
            type="search"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            placeholder="Buscar usuario .."
        />
      </span>
        </Fragment>
    );
};

export default InputSearch;
