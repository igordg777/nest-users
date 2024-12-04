import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) { }

    async createUser(dto: createUserDTO) {
        const user = await this.userRepository.create(dto);
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users
    }

}
