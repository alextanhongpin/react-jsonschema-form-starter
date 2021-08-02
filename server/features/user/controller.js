import { InternalError } from '../error/error.js'

export default class UserController {
  constructor (usecase) {
    if (!usecase) throw new InternalError('missing dependency: usecase')
    this.usecase = usecase
  }

  createRoutes () {
    const usecase = this.usecase

    async function getUser (req, res, next) {
      try {
        const user = await usecase.findOne({ _id: req.params.id })
        return res.status(200).json({
          data: user
        })
      } catch (err) {
        next(err)
      }
    }

    async function getUsers (req, res, next) {
      try {
        const forms = await usecase.findAll(req.query)
        return res.status(200).json({
          data: forms
        })
      } catch (err) {
        next(err)
      }
    }

    async function postUser (req, res, next) {
      try {
        const user = await usecase.create(req.body)
        return res.status(200).json({
          data: user
        })
      } catch (err) {
        next(err)
      }
    }

    async function patchUser (req, res, next) {
      try {
        const user = await usecase.update(req.body)
        return res.status(200).json({
          data: user
        })
      } catch (err) {
        next(err)
      }
    }

    return {
      getUser,
      getUsers,
      postUser,
      patchUser
    }
  }
}
