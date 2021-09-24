import {clientAxios} from "../config/user.axios";
import {User} from "../interfaces/app.interface";

/**
 * Service to get data from our API
 */
export const UserService = {
    async getAll() {
        const response = await clientAxios.get<User[]>(`/users`);
        return response.data;
    },
    async getChunk(take: number, skip: number) {
        const response = await clientAxios.get<User[]>(
            `/users?take=${take}&skip=${skip}`
        );
        return response.data;
    },
    async getMatches(query: string) {
        const response = await clientAxios.get<User[]>(
            `/users/matches/set?q=${query}`
        );
        return response.data;
    },
    async getOne(id: string) {
        const response = await clientAxios.get<User>(`/users/${id}`);
        return response.data;
    },
    async create(user: User) {
        const response = await clientAxios.post<User>("/users", user);
        return response.data;
    },
    async update(user: User, id: string) {
        const response = await clientAxios.put<User>(`/users/${id}`, user);
        return response.data;
    },
    async getTotalRecords() {
        const response = await clientAxios.get<{ total: number }>(
            `/users/total/records`
        );
        return response.data.total;
    },
    async delete(id: string) {
        const response = await clientAxios.delete<{ deleted: number }>(
            `/users/${id}`
        );
        return response.data.deleted;
    }
};
