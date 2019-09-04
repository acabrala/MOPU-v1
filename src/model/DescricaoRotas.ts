import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Routes } from './Rotas';

@Table({
    tableName: "descricao_rotas"
})

export class RoutesDescriptions extends Model<RoutesDescriptions> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => Routes)
    @Column
    id_rota: number

    @Column
    horario_rota: string
    
    @Column
    horario_saida: boolean

    @Column
    horario_chegada: boolean

    @Column
    is_push: boolean
    
}