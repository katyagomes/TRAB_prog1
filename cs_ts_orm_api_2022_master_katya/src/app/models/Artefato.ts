import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, ManyToOne, JoinColumn } from 'typeorm';

import ItensCompra from './ItensCompra';

@Entity('tb_artefato')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Artefato {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column()
    peso: number;

    @Column()
    valor: number;

    // @ManyToOne(type => ItensCompra)
    // @JoinColumn({ name: "itensCompra_id", referencedColumnName: "id" })
    // endereco: ItensCompra;
}