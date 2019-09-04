import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany, ForeignKey, HasOne, AllowNull } from 'sequelize-typescript';
import { User } from './User';
import { LinesRoutes } from './LinhasRotas';
import { RoutesDescriptions } from './DescricaoRotas';
import { RoutesDay } from './DiasRotas';


@Table({
    tableName: "rotas"
})

export class Routes extends Model<Routes> {

    @AutoIncrement
    @Column({ primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @ForeignKey(() => User)
    @Column({type: DataType.STRING})
    id_usuario: string

    @Column
    nome_rota: string

    @Column
    origem: string

    @Column
    destino: string

    @HasMany (() => LinesRoutes)
    linhas: LinesRoutes[];

    @HasOne (() => RoutesDescriptions)
    descricao_rota: RoutesDescriptions[];

    @HasMany (() => RoutesDay)
    dias_rota: RoutesDay[];

}