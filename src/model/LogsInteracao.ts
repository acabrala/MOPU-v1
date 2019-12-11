import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "logs-interacao"
})

export class LogsInteracao extends Model<LogsInteracao> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    id_usuario: string;

    @Column
    id_incidente: string;

    @CreatedAt
    @Column
    data_interacao: Date;

    @Column
    like: Boolean


}