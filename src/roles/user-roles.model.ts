import { AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';


interface RoleCreationAttrs {
    value: string;
    description: string;
}
@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })

export class UserRoles extends Model<UserRoles, RoleCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

}