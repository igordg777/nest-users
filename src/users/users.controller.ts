import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })

    @Post()
    create(@Body() userDto: createUserDTO) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Получение пользователей для администраторов' })
    @ApiResponse({ status: 200, type: [User] })
    // @UseGuards(JwtAuthGuard)
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }


    @ApiOperation({ summary: 'Получение пользователей для роли USER' })
    @ApiResponse({ status: 200, type: [User] })
    // @UseGuards(JwtAuthGuard)
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get("/role_user")
    ex() {
        return this.userService.getAllUsers();
    }
}
