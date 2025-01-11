import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: createUserDTO) {
        return this.authService.login(userDto)
    }


    @Post('/registration')
    registration(@Body() userDto: createUserDTO) {
        return this.authService.registration(userDto)
    }

}
