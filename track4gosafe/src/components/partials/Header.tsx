import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Header = () => {

    const history = useHistory();
    const match = useRouteMatch();
    
    const items: MenuItem[] = [
        {
            label: 'Lista de usuarios',
            icon: 'pi pi-users',
            command: () => { history.push(`${match.path}`); }
        },
        {
            label: 'Agregar nuevo',
            icon: 'pi pi-user-plus',
            command: () => {
                history.push(`${match.path}newuser`);
            }
        }
    ];

    return (
        <div>
            <div className="card">
                <Menubar model={items}
                    end={<div className="p-text-bold">CRUD TRACK4GOSA</div>} />
            </div>
        </div>
    );
};

export default Header;