# react-jsonschema-form-starter


Exploring dynamic forms that could be stored in the db, and rendered on demand.

Alternative lib:
- [react-jsonforms](https://github.com/alextanhongpin/react-jsonforms)

Usecases
- allows dynamic form generation by tweaking the jsonschema, which could be stored either on the client side first, or potentially database
- handles validation, single and bulk insertion. Though, for bulk insertion, a stylesheet like UI would be more appropriate, and the bulk data source could be from CSV


Challenges

- how to support array? Provided in the example docs.
- how to fetch options list from API?
  - [Write a custom component to fetch from the endpoint](https://github.com/rjsf-team/react-jsonschema-form/issues/1621). The example also demonstrates the usage of [jsonata](https://github.com/jsonata-js/jsonata).
	- Instead of loading the json data from the FE, backend can send the whole json schema form as well as the form data and also the form options. That way, the whole update process is facilitated from the Backend and does not require deployments on the Frontend.
