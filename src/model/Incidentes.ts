import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "incidentes"
})

export class Incidentes extends Model<Incidentes> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number;

    @Column({ allowNull: false })
    id_usuario: string;

    @Column
    tipo_transporte: string;

    @Column
    problema: string;

    @Column
    linha_problema: string;

    @Column
    local_problema: string;

    @Column
    horario_ocorrencia: string;

    @Column
    id_mobile: string;

    @Column({type: DataType.FLOAT})
    longitude: number;

    @Column({type: DataType.FLOAT})
    latitude: number;

    @Column
    anonimo: boolean;

}