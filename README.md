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
- should create/update be a separate form?
- the jsonschema can be shared on the server and client side now for validation
- bulk create/update is probably a separate flow too
- is it possible to convert the postgres type to jsonschema? https://www.pg-structure.com/

Flow for single creationg
- user navigates to create resource
- server returns the json schema and ui schema, together with other information like endpoint to POST as well as form behaviour (redirection etc)
- server also validates on the server side with the same jsonschema (?)
- ideally the json schema should also be enforced on mongodb side (?). However, whenever the JSON schema changes, we need to update the collection jsonschema again.
