import { app, setup } from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm"

describe("persistence test", () => {

    afterAll(async () => {
        await getConnection().close()
    });

    beforeAll(async () => {
        await setup()
    });

    it('teste /patente/list e /patente/delete', async () => {
        var agent = supertest(app);
        const postList = await agent.get('/patentes');
        expect(postList.statusCode).toEqual(200);
        if (postList.body.length > 0) { 
            for (const p of postList.body) {

                const data = { "id": p.id };

                console.log("Encontrou a patente: ");
                console.log(data);

                const postDelete = await agent.delete('/patentes').send(data);

                console.log("Removeu a patente: ");
                console.log(data);

                expect(postDelete.statusCode).toEqual(204);
            }
        } else {
            const data = { "nome": "Teste1", "cor": "Azul" };
            const postCreate = await agent.post('/patentes').send(data);
            console.log("Cadastrou a patente: ");
            console.log(postCreate);

            expect(postCreate.statusCode).toEqual(200);
        }

    });


    it('teste /jogador/list e /jogador/delete', async () => {
        var agent = supertest(app);
        const listJogador = await agent.get('/jogadores');
        expect(listJogador.statusCode).toEqual(200);

        console.log(listJogador.body.length)

        if (listJogador.body.length > 0) {
            console.log(`Encontrou ${listJogador.body.length} jogadores cadastrados.`);

            for (const j of listJogador.body) {

                const data = { "nickname": j.nickname };
                console.log(`Removendo o jogador ${data.nickname}.`);
                const postDeleteJogador = await agent.delete('/jogadores').send(data);
                expect(postDeleteJogador.statusCode).toEqual(204);
            }
        } else {
            console.log("Não encontrou jogadores cadastrados, cadastrando novo jogador e patente.");

            const postCreatePatente = await agent.post('/patentes').send({ "nome": "Ouro", "cor": "dourado" });
            expect(postCreatePatente.statusCode).toEqual(200);
            const postFindPatente = await agent.get('/patentes').send({ "nome": "Ouro" });
            expect(postFindPatente.statusCode).toEqual(200);

            //console.log(postFindEndereco.body);
            const data = {
                "nickname": "teste9",
                "senha": "123456",
                "pontos": 0,
                "patentes": [{"id":postFindPatente.body[0]}]
            };

            const postCreateJogador = await agent.post('/jogadores').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        }
    })

})
