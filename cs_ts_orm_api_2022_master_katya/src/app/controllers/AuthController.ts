import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Jogador from '../models/Jogador';


class AuthController {

    async checkPlayer(req: Request, res: Response) {
        const repository = getRepository(Jogador);//recupera o repositorio do jogador.

        console.log(req.body);//imprime na saida padrão a mensagem recebida. Isso é apenas para teste...

        const { nickname, senha } = req.body;//extrai os atributos nickname e senha do corpo da mensagem.

        const nicknameExists = await repository.findOne({ where: { nickname } });//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if (!nicknameExists) {
            return res.sendStatus(404);//caso não exista um registro, retorna 404 informando o conflito
        }

        if (nicknameExists.senha != senha) {
            return res.sendStatus(400);//caso a senha esteja incorreta, retorna 400 informando o conflito
        }

        //altera o registro data_ultimo_login para informar a data atual do sistema
        nicknameExists.data_ultimo_login = new Date();

        await repository.save(nicknameExists)

        const lista = await repository.createQueryBuilder('tb_jogador').where({ "nickname": nicknameExists.nickname }).innerJoinAndSelect("tb_jogador.endereco", "endereco").leftJoinAndSelect("tb_jogador.patentes", "patente").getMany();
        //return res.json(nicknameExists).sendStatus(200);
        return res.status(200).json(lista);
    }

}
export default new AuthController();