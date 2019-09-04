import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "mobile"
})

export class Mobile extends Model<Mobile> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    fabricante: string;

    @Column
    modelo: string;

    @Column
    versao_so: string;

    @Column
    so: number;
    
    @CreatedAt
    @Column
    data_criacao: Date;

    @Column
    imei: string;

    @Unique
    @Column
    serial: string;

    @Column
    sim_card: number;

    @Column
    versao_app: string;

    @Column({defaultValue: false})
    is_anonimo: boolean;

}