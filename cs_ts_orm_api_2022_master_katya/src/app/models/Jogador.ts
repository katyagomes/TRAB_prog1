import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';


import Endereco from '../models/Endereco';
import Patente from '../models/Patente';
import Artefato from './Artefato';
import Compra from './Compra';

@Entity('tb_jogador')
class Jogador {

    @PrimaryColumn('text')
    nickname: string;

    @Column('text')
    senha: string;

    @Column('int')
    pontos: number;

    //coluna opcional
    @Column('date', { nullable: true })
    data_ultimo_login: Date;

    //coluna opcional, caso nao seja informado data, vai receber a data corrente.
    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @ManyToOne(type => Endereco)
    @JoinColumn({ name: "endereco_id", referencedColumnName: "id" })
    endereco: Endereco;

    @ManyToMany(() => Patente)
    @JoinTable({ name: "tb_jogador_patente", joinColumn: { name: "jogador_nickname", referencedColumnName: "nickname" }, inverseJoinColumn: { name: "patente_id", referencedColumnName: "id" } })
    patentes: Patente[];

    @OneToMany(() => Compra, (compra) => compra.jogador)
    compras: Compra[];

    //agregacao
    @ManyToMany(() => Artefato)
    @JoinTable({
        name: "tb_jogador_artefato", joinColumn: {
            name:
                "jogador_nickname", referencedColumnName: "nickname"
        }, inverseJoinColumn: {
            name:
                "artefato_id", referencedColumnName: "id"
        }
    })
    artefatos: Artefato[];
}

export default Jogador;