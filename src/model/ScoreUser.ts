import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { User } from './User';


@Table({
    tableName: "score-user"
})

export class ScoreUser extends Model<ScoreUser> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => User)
    @Column({type: DataType.STRING})
    id_usuario: string

    @Column
    score_dia: string

}