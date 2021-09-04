import { User } from "src/entities/User";
import { CreateUserDto } from "./dtos/UserDto";

export interface UserInterface {
    findAll(): Promise<User[]>;
    findChunk(skip: number, take: number): Promise<User[]>;
    findMatchesByNameAndId(math: string): Promise<User[]>;
    findById(id: string): Promise<User>;
    save(user: CreateUserDto): Promise<User>;
    updateById(id: string, user: CreateUserDto):Promise<User>
    deleteById(id: string): Promise<{deleted: number}>
}
