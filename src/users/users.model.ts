import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger';


interface UserCreationAttrs {
    email: string;
    poassword: string;
}
@Table({ tableName: 'users' })

export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @Column({ type: DataType.STRING, allowNull: false })

    @ApiProperty({ example: '123', description: 'Пароль' })
    password: string;
    @Column({ type: DataType.BOOLEAN, defaultValue: false })

    @ApiProperty({ example: 'true', description: 'Бан или нет' })
    banned: boolean;

    @ApiProperty({ example: 'true', description: 'Причина блокировки' })
    @Column({ type: DataType.BOOLEAN, allowNull: true })
    banReason: string;
}