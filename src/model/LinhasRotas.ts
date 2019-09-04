import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Routes } from './Rotas';

@Table({
    tableName: "linhas_rotas"
})

export class LinesRoutes extends Model<LinesRoutes> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => Routes)
    @Column
    id_rota: number

    @Column
    tipo_transporte: string
    
    @Column
    descricao: string
    
}