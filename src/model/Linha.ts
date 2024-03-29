import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, AllowNull, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: "linhas"
})

export class Linhas extends Model<Linhas> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column({ allowNull: false })
    nome_linha: string;

    @Column
    numero_linha: string; 


    @Column
    codigo_linha: string;

    @Column
    versao: string; 

}
