import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Compra from './Compra';

import Artefato from './Artefato';

@Entity('tb_itenscompra')
export default class ItensCompra {
    @PrimaryColumn('int')
    id: number;

    @Column('text')
    quantidade: String;

    @Column()
    valor: number;

    //Composição
    @ManyToOne(type => Compra)
    @JoinColumn({ name: 'compra_id', referencedColumnName: 'id' })
    compra: Compra;

    //associação.
    @ManyToOne(type => Artefato)
    @JoinColumn({name: "artefato_id", referencedColumnName:"id"})
    artefato: Artefato;
}