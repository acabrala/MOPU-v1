import { Table, Column, Model, Length, IsEmail, CreatedAt, Unique, DataType, BeforeCreate, AutoIncrement, HasMany } from 'sequelize-typescript';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Routes } from '../model/Rotas'
import { Favoritos } from './Favoritos';

@Table({
    tableName: "usuario"
})

export class User extends Model<User> {

    @AutoIncrement
    @Column({type: DataType.INTEGER })
    id: number;

    @Column({primaryKey: true, type: DataType.STRING, defaultValue: DataType.UUIDV4 })
    id_user:string
    
    @Unique
    @Column({ allowNull: true })
    email: string;

    @Length({ min: 6, msg: "Sua senha deve ter no minimo 6 caracteres." })
    @Column({ allowNull: true })
    senha: string;

    @CreatedAt
    @Column
    data_criacao: Date;

    @HasMany(() => Routes)
    usuarios: Routes[];

    @HasMany(() => Favoritos)
    favoritos: Favoritos[];

    @Column({ allowNull: false })
    nome: string;

    @Column
    telefone: string;

    @Column
    data_nascimento: Date;

    @Column
    score: number;

    @Column
    is_facebook: boolean;

    @Column
    is_google: boolean;

    @Column
    is_twitter: boolean;

    @Column
    code: string;

    @Column
    password_reset_token: string;

    @Column
    imagem:string;

    @BeforeCreate
    static async hashPassword(instance: User) {
        const salt = await bcrypt.genSalt(10);
        instance.senha = await bcrypt.hash(instance.senha, salt);
    }

    async isValidPassword(pass: String) {
        return await bcrypt.compare(pass, this.senha);
    }

    async changePassword(newPassword: String) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(newPassword, salt);
    }

    generateAuthToken() {
        return jwt.sign({ _id: this.id }, "mkt#RPC2017@", { expiresIn: "1h" });
    }
}