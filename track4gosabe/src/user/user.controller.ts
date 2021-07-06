import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/entities/User';
import { CreateUserDto } from './dtos/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {

    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get("/:id")
    getById(@Param("id") id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Post()
    save(@Body() user: CreateUserDto) {
        return this.userService.save(user);
    }

    @Put("/:id")
    updateById(@Param("id") id: string,
        @Body() user: CreateUserDto): Promise<User> {
        return this.userService.updateById(id, user);
    }

    @Delete("/:id")
    deleteById(@Param("id") id: string) {
        return this.userService.deleteById(id);
    }

}
