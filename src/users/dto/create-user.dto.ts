import { ApiProperty } from '@nestjs/swagger';


export class createUserDTO {

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    readonly email: string;

    @ApiProperty({ example: '123', description: 'Пароль' })
    readonly password: string;
}