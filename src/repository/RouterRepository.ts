import Estacao from "../model/Estacao";
import { Routes } from "../model/Rotas";
import { LinesRoutes } from "../model/LinhasRotas";
import { RoutesDescriptions } from "../model/DescricaoRotas";
import { RoutesDay } from "../model/DiasRotas";
import Trips from "../model/Trips";
let diasSemanasArray: Array<number> = [];
const qs = require('querystring');
const axios = require("axios");



export class RouterRepository {

    createRouter = async (rota) => {

        console.log(rota)

        return await Routes.create(rota)

    }

    updateRouter = async (router) => {

        let dias_usuario = []
        let ids_dias_usuario = []
        const rotaId = router.rota.id
        const rota = router.rota
        delete rota.id
        const descricaoRota = router.descricao_rota
        const diasRotas = router.dias_rota;
        const linhasRotas = router.linhas

        let rota_update = Routes.update(rota, { where: { id: rotaId } })
        if (rota_update) {
            let rota_descricao = RoutesDescriptions.update(descricaoRota, { where: { id_rota: rotaId } })
        }

        LinesRoutes.findAll({ where: { id_rota: rotaId } }).then(result => {
            for (let k = 0; k < result.length; k++) {
                LinesRoutes.update(linhasRotas[k], { where: { id: result[k].dataValues.id } })

            }
        })

        if (diasRotas.segunda == 1) {
            dias_usuario.push(1)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.terca == 1) {
            dias_usuario.push(2)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.quarta == 1) {
            dias_usuario.push(3)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.quinta == 1) {
            dias_usuario.push(4)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.sexta == 1) {
            dias_usuario.push(5)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.sabado == 1) {
            dias_usuario.push(6)
        } else {
            dias_usuario.push(0)
        }
        if (diasRotas.domingo == 1) {
            dias_usuario.push(7)
        } else {
            dias_usuario.push(0)
        }

        RoutesDay.findAll({ where: { id_rota: rotaId } })
            .then((id_dias) => {
                for (let a = 0; a < id_dias.length; a++) {
                    ids_dias_usuario.push(id_dias[a].dataValues.id)
                    ids_dias_usuario.sort()
                }
                for (let i = 0; i <= dias_usuario.length; i++) {

                    let payload = {
                        weekday: dias_usuario[i]
                    }

                    RoutesDay.update(payload, {
                        where: {
                            id: ids_dias_usuario[i]
                        }
                    }).then(results => {

                    })
                }
            })

        return rota_update

    }

    createRouterLines = async (linhas, rotaId) => {

        let result = linhas.map((linha) => {

            linha.id_rota = rotaId

            LinesRoutes.create(linha)

        })

        return await result;

    }

    createDescriptionRouter = async (description) => {

        return await RoutesDescriptions.create(description)

    }

    deleteRouter = async (rotaId) => {

        return await Routes.destroy({ where: { id: rotaId.id } })
    }

    createDaysRouter = async (days) => {

        switch (true) {
            case days.segunda: {

                if (days.segunda == true) {
                    diasSemanasArray.push(1)

                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.terca: {
                if (days.terca == true) {
                    diasSemanasArray.push(2)
                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.quarta: {
                if (days.quarta == true) {
                    diasSemanasArray.push(3)
                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.quinta: {
                if (days.quinta == true) {
                    diasSemanasArray.push(4)
                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.sexta: {
                if (days.sexta == true) {
                    diasSemanasArray.push(5)
                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.sabado: {
                if (days.sabado == true) {
                    diasSemanasArray.push(6)
                } else {
                    diasSemanasArray.push(0)
                }
            }
            case days.domingo: {
                if (days.domingo == true) {
                    diasSemanasArray.push(7)
                } else {
                    diasSemanasArray.push(0)
                }
            }
        }

        let dias = diasSemanasArray.map((diasSemanas) => {

            let payload = {
                "weekday": diasSemanas,
                "id_rota": days.id_rota
            }

            RoutesDay.create(payload)

        })

        return dias

    }

    alterNotification = async (notification) => {

        let id = notification.id_rota
        delete notification.id_rota

        return await RoutesDescriptions.update(notification, { where: { id_rota: id } })

    }

    matchRota = async(information) => {

        let endereco_user = `https://maps.googleapis.com/maps/api/geocode/json?address=${qs.escape(information.endereco)}&key=AIzaSyBLPU6jJlWuyz9u3mIvExfsJ95NZF7Gqlg`;

        axios.get(endereco_user).then(async result => {
            let lat_long = result.data.results[0].geometry.location;

            let localUser = [result.data.results[0].geometry.location.lng, result.data.results[0].geometry.location.lat]
            console.log(localUser);


            let numberLine = information.linha.split('-')[0]

            const txt = await Trips.find({trip_headsign: 'Lauzane Paulista', route_id: '/'+numberLine+'/'})
            console.log(txt);
            
        })
        // { rota:
        //     { id: 0,
        //       nome_rota: 'Teste',
        //       origem: 'Rua Rêgo Freitas, 63 - República, São Paulo - SP, Brasil',
        //       destino:
        //        'Avenida Braz Leme, 260 - Vila Ester (Zona Norte), São Paulo - SP, Brasil' },
        //    linhas:
        //     [ { tipo_transporte: 'onibus',
        //         descricao: '178L - LAUZANE PAULISTA' } ],
        //    dias_rota:
        //     { domingo: false,
        //       segunda: false,
        //       terca: true,
        //       quarta: true,
        //       quinta: true,
        //       sexta: false,
        //       sabado: false },
        //    descricao_rota:
        //     { horario_rota: '12:00',
        //       horario_saida: true,
        //       horario_chegada: false,
        //       is_push: true } }

        //preciso do endereço para pegar a lat e long e conseguir ver qual o stop id mais proximo


    }
}
