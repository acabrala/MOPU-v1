import { Response } from '../model/Response';
import { RouterRepository } from '../repository/RouterRepository';

export class RouterUserController {

    private routerRepository: RouterRepository;

    constructor(routerRepository: RouterRepository) {
        this.routerRepository = routerRepository
    }

    createNewRouter = async (req, res) => {
        try {

            const router = await this.routerRepository.createRouter(req.body.rota)

            if (!router) {

                res.status(404).json(new Response(true, 'Ocorreu um erro ao gravar sua rotas', null))

            } else {

                const linhas = req.body.linhas
                linhas.id_rota = router.dataValues.id

                const linesRouter = await this.routerRepository.createRouterLines(linhas, router.dataValues.id)

                if (!linesRouter) {
                    res.status(404).json(new Response(true, 'Erro ao salvar linhas', null))
                } else {

                    const descricao_rota = req.body.descricao_rota
                    descricao_rota.id_rota = router.dataValues.id
                    const descriptionRouter = await this.routerRepository.createDescriptionRouter(descricao_rota)

                    if (!descriptionRouter) {
                        res.status(404).json(new Response(true, 'Erro ao salvar descricao', null))

                    }

                    const daysRouter = req.body.dias_rota
                    daysRouter.id_rota = router.dataValues.id

                    const diasRotas = await this.routerRepository.createDaysRouter(daysRouter)

                }


                res.status(201).json(new Response(false, "Rota Inserida com sucesso", { "id_rota": router.dataValues.id }))
            }

        } catch (e) {


        }
    }


    deleteRouterUser = async (req, res) => {
        try {
            const delRouter = this.routerRepository.deleteRouter(req.body)
            if (!delRouter) {
                res.status(404).json(new Response(true, 'Erro ao excluir rotas', null))
            }

            res.status(202).json(new Response(false, "Rota excluída com sucesso", delRouter))

        } catch (e) {

            return res.status(422).json(new Response(true, e.message, null))

        }
    }

    updateRouterUser = async (req, res) => {
        try {
            const updateRouter = this.routerRepository.updateRouter(req.body)
            if (!updateRouter) {
                res.status(422).json(new Response(true, 'Não foi possivel atualizar sua rota', null))
            }
            res.status(201).json(new Response(false, 'Rota atualizada com sucesso', null))
        } catch (e) {
            res.status(400).json(new Response(true, e.message, null))
        }
    }

    changeNotification = async (req, res) => {
        try {

            const notification = this.routerRepository.alterNotification(req.body)

        } catch (e) {

        }
    }

}