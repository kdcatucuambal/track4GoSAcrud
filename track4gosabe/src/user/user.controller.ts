import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {get} from 'http';
import {User} from 'src/entities/User';
import {ValidateNumberPipe} from 'src/pipes/validate-number.pipe';
import {CreateUserDto} from './dtos/UserDto';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    getAll(
        @Query('take', ValidateNumberPipe) take: number,
        @Query('skip', ValidateNumberPipe) skip: number,
    ): Promise<User[]> {
        if (skip !== null && skip !== null) {
            return this.userService.findChunk(take, skip);
        }
        return this.userService.findAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Get('/matches/set')
    getMatches(@Query('q') q: string) {
        return this.userService.findMatchesByNameAndId(q);
    }

    @Get('/total/records')
    async getRecords() {
        return {
            total: await this.userService.getTotalRecords(),
        };
    }

    @Post()
    save(@Body() user: CreateUserDto) {
        return this.userService.save(user);
    }

    @Put('/:id')
    updateById(
        @Param('id') id: string,
        @Body() user: CreateUserDto,
    ): Promise<User> {
        return this.userService.updateById(id, user);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.userService.deleteById(id);
    }
}
