import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "ponto_time"
})

export class Mobile extends Model<Mobile> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    id_user: string;
    
    @Column
    stop_id: number;

    @Column
    tempo: number;

    @Column
    partida: string;
    
}