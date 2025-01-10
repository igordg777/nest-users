import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { log } from 'console';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async login(userDto: createUserDTO) {

    }



    async registration(userDto: createUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        console.log({ candidate, userDto })
        if (candidate) {
            throw new HttpException('Пользователь с таким Email существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        return this.generateToken(user)
    }

    async generateToken(user) {

        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
