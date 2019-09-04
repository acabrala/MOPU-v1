import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Routes } from './Rotas';



@Table({
    tableName: "dias_rotas"
})

export class RoutesDay extends Model<RoutesDay> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => Routes)
    @Column
    id_rota: number

    @Column
    weekday: number
    
    
}