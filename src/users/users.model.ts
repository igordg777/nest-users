import { AutoIncrement, BelongsToMany, HasMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Post } from 'src/posts/post.model';


interface UserCreationAttrs {
    email: string;
    poassword: string;
}
@Table({ tableName: 'users' })

export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;


    @ApiProperty({ example: 'true', description: 'Бан или нет' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'true', description: 'Причина блокировки' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}