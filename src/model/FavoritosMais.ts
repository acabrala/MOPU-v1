import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, AllowNull, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: "favoritos_mais"
})

export class FavoritosMais extends Model<FavoritosMais> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => User)
    @Column({type: DataType.STRING})
    id_usuario: string
    
    @Column({ allowNull: false })
    endereco: string;

    @Column({ allowNull: false})
    tipo: string

    @CreatedAt
    @Column
    data_criacao: Date;

}