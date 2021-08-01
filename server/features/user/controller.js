import UserError from './error.js'

export default class UserController {
  constructor (usecase) {
    if (!usecase) throw new UserError('missing dependency: usecase')
    this.usecase = usecase
  }

  createRoutes () {
    const usecase = this.usecase

    async function getUser (req, res) {
      const user = await usecase.findOne(req.params.id)
      return res.status(200).json({
        data: user
      })
    }

    async function getUsers (req, res) {
      const forms = await usecase.findAll(req.query)
      return res.status(200).json({
        data: forms
      })
    }

    async function postUser (req, res) {
      const user = await usecase.create(req.body)
      return res.status(200).json({
        data: user
      })
    }

    async function patchUser (req, res) {
      const user = await usecase.update(req.body)
      return res.status(200).json({
        data: user
      })
    }

    return {
      getUser,
      getUsers,
      postUser,
      patchUser
    }
  }
}
