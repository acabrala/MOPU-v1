import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, AllowNull, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "incidentes_padrao"
})

export class IncidentesPadrao extends Model<IncidentesPadrao> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column({ allowNull: false })
    motivo: string;

    @Column
    submotivo: string; 

    @CreatedAt
    @Column
    data_criacao: Date; 

}