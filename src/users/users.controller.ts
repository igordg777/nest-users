import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    create(@Body() userDto: createUserDTO) {
        return this.userService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
