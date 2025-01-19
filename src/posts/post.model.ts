import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}
@Table({ tableName: 'posts' })

export class Post extends Model<Post, PostCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'DeepSeek новая ИИ от Китайских разработчиков', description: 'Название поста' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @ApiProperty({ example: 'DeepSeek удивляет, это достойный конкурент чата GPT...', description: 'Содержание поста' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @ApiProperty({ example: 'Image.png', description: 'Название файла' })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User


}