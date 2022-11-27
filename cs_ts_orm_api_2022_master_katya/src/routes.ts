import {Router} from 'express';
//import AuthController from './app/controllers/AuthController';
import JogadorController from  './app/controllers/JogadorController';
import EnderecoController from './app/controllers/EnderecoController';
import PatenteController from './app/controllers/PatenteController';


const router = Router();

//criando  rotas para /jogadores.
router.post('/jogador/store', JogadorController.store);
router.post('/jogador/update', JogadorController.update);
router.post('/jogador/delete', JogadorController.delete);
router.post('/jogador/list', JogadorController.list);
//router.post('/auth', AuthController.authenticate);


//criando  rotas para /enderecos.
router.post('/enderecos', EnderecoController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController
router.get('/enderecos', EnderecoController.list);//define uma rota ...
router.delete('/enderecos', EnderecoController.delete);//define uma rota ...

//criando  rotas para /patentes.
router.post('/patentes', PatenteController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController
router.get('/patentes', PatenteController.list);//define uma rota ...
router.delete('/patentes', PatenteController.delete);//define uma rota ...

//router.post('/auth', AuthController.checkPlayer);
export default router;

