import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/UserDto';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService implements UserInterface {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {

    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { identificationCard: id } });
    }

    async save(user: CreateUserDto): Promise<User> {
        const instance = this.userRepository.create(user);
        return await this.userRepository.save(instance);
    }

    async updateById(id: string, user: CreateUserDto): Promise<User> {
        const userFound = await this.findById(id);
        const updateUser = Object.assign(userFound, user);
        return await this.userRepository.save(updateUser);
    }

    async deleteById(id: string): Promise<{ deleted: number; }> {
        const result = await this.userRepository.delete({ identificationCard: id });
        return { deleted: result.affected };
    }

}
