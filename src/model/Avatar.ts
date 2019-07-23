import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, AllowNull, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "avatar"
})

export class Avatar extends Model<Avatar> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column({ allowNull: false })
    avatar: string;

    @CreatedAt
    @Column
    data_criacao: Date;

}