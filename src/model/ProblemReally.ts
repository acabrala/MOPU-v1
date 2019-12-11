import * as moment from 'moment-timezone'

import { Table, Column, Model, DataType, AutoIncrement } from 'sequelize-typescript';
// let data_local = moment.tz(Date.now(), "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")

@Table({
    tableName: "problema-real"
})

export class ProblemReally extends Model<ProblemReally> {

    @AutoIncrement
    @Column({primaryKey: true, type: DataType.INTEGER })
    id: number; 

    @Column
    tipo_transporte: string;

    @Column
    linha_problema: string;

    @Column
    local_problema: string;

    @Column
    motivo: string;
    
    @Column
    submotivo: string;

    @Column
    id_usuario: string;

    @Column
    horario_inicio: Date;

    @Column
    horario_fim: Date;

    @Column
    ocorrencia_finalizada: Boolean

    @Column
    duracao_ocorrencia: number

    @Column({defaultValue: 1})
    quantidade_relatada: number
}