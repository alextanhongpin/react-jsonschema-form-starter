import { InternalError } from '../error/error.js'

export default class BookController {
  constructor (usecase) {
    if (!usecase) throw new InternalError('missing dependency: usecase')
    this.usecase = usecase
  }

  createRoutes () {
    const usecase = this.usecase

    async function getBook (req, res, next) {
      try {
        const book = await usecase.findOne({ _id: req.params.id })
        return res.status(200).json({
          data: book
        })
      } catch (err) {
        next(err)
      }
    }

    async function getBooks (req, res, next) {
      try {
        const forms = await usecase.findAll(req.query)
        return res.status(200).json({
          data: forms
        })
      } catch (err) {
        next(err)
      }
    }

    async function postBook (req, res, next) {
      try {
        const book = await usecase.create(req.body)
        return res.status(200).json({
          data: book
        })
      } catch (err) {
        next(err)
      }
    }

    async function patchBook (req, res, next) {
      try {
        const book = await usecase.update(req.body)
        return res.status(200).json({
          data: book
        })
      } catch (err) {
        next(err)
      }
    }

    return {
      getBook,
      getBooks,
      postBook,
      patchBook
    }
  }
}
