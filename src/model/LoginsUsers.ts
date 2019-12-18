import { Table, Column, Model, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: "logins_usuario"
})

export class LoginsUsuario extends Model<LoginsUsuario> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    id_usuario: string;
    
    @Column
    data_login: string;

    @Column
    mobile: number;

    
}