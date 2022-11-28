import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Jogador from '../models/Jogador';
import Endereco from '../models/Endereco';
import Patente from '../models/Patente';

class JogadorController {

    async list(req: Request, res: Response) {

        const repository = getRepository(Jogador);


       
        const lista = await repository.createQueryBuilder('tb_jogador').leftJoinAndSelect("tb_jogador.patentes", "patente").getMany();
       
        return res.json(lista);
    }

    async store(req: Request, res: Response) {

        const repository = getRepository(Jogador);

        console.log(req.body);

        const { nickname } = req.body;

        const nicknameExists = await repository.findOne({ where: { nickname } });

        if (nicknameExists) {

            return res.sendStatus(409);

        }

        const j = repository.create(req.body);

        await repository.save(j);

        return res.json(j);

    }

    async delete(req: Request, res: Response) {

        const repository = getRepository(Jogador);

        const { nickname } = req.body;

        const nicknameExists = await repository.findOne({ where: { nickname } });

        if (nicknameExists) {

            await repository.remove(nicknameExists);
            return res.sendStatus(204);

        } else {

            return res.sendStatus(404);
        }
    }

    async update(req: Request, res: Response) {

        const repository = getRepository(Jogador);

        const { nickname } = req.body;
        const nicknameExists = await repository.findOne({ where: { nickname } });
        if (!nicknameExists) {
            return res.sendStatus(404);
        }

        const j = repository.create(req.body); 

        await repository.save(j); 

        return res.json(j);
    }


}

export default new JogadorController();