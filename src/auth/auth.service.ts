import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async login(userDto: createUserDTO) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto: createUserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email);
        console.log({ userDto_password: userDto.password, user_password: user });
        console.log({ user_password578678: user.dataValues.password });



        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.dataValues.password);
            console.log({ passwordEquals });

            if (passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({ messsge: "Некорртектный пароль" })
        } else {
            throw new UnauthorizedException({ messsge: "Некорртектный email" })
        }

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

    private async generateToken(user) {

        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
