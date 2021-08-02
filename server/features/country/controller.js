export default class CountryController {
  createRoutes () {
    const countries = [
      {
        id: 1,
        name: 'Malaysia'
      },
      {
        id: 2,
        name: 'Singapore'
      }
    ]

    function getCountry (req, res) {
      const { id } = req.params

      return res.status(200).json({
        data: countries.find((country) => country.id === Number(id))
      })
    }

    function getCountries (req, res) {
      const { name } = req.query

      return res.status(200).json({
        data: countries.filter((country) =>
          country.name.toLowerCase().startsWith(name)
        )
      })
    }

    return {
      getCountry,
      getCountries
    }
  }
}
