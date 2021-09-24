export interface User {
    id: number;
    name: string;
    identificationCard: string;
    phone: string;
    email: string;
}

export interface stateProps {
    users: User[];
    error: any;
    loading: boolean;
    userDelete: any;
    userEdit: any;
    alert: boolean;
    totalRecords: number;
    lazyParams: LazyParams;
    auxQuery: boolean;
}

export interface LazyParams {
    first: number;
    rows: number;
    page: number;
}
