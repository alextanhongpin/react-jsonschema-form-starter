export const data = {
  name: 'users',
  jsonSchema: {
    title: 'An update user form',
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName', 'age'],
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
        minLength: 1
      },
      lastName: {
        type: 'string',
        title: 'Last name',
        minLength: 1
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email'
      },
      gender: {
        type: 'string',
        enum: ['male', 'female'],
        enumNames: ['Male', 'Female']
      },
      age: {
        type: 'number',
        title: 'Age',
        minimum: 1,
        maximum: 120
      },
      bio: {
        type: 'string',
        title: 'Bio'
      },
      telephone: {
        type: 'string',
        title: 'Telephone',
        minLength: 10
      },
      country: {
        type: 'number'
      },
      additionalProperties: false
    }
  },
  uiSchema: {
    firstName: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:autocomplete': 'family-name'
    },
    lastName: {
      'ui:emptyValue': '',
      'ui:autocomplete': 'given-name'
    },
    age: {
      'ui:widget': 'updown',
      'ui:title': 'Age of person',
      'ui:description': '(earthian year)'
    },
    bio: {
      'ui:widget': 'textarea'
    },
    gender: {
      'ui:widget': 'select'
    },
    password: {
      'ui:widget': 'password',
      'ui:help': 'Hint: Make it strong!'
    },
    date: {
      'ui:widget': 'alt-datetime'
    },
    telephone: {
      'ui:options': {
        inputType: 'tel'
      }
    },
    country: {
      // Custom search dropdown to populate the field.
      'ui:widget': 'search-dropdown',
      'ui:options': {
        optionsForApi: {
          searchable: true,
          // We need to prefetch the option if it has already been selected.
          // Uses handlebars to parse the template.
          prefetchUrl: '/api/v1/countries/{{value}}',
          prefetchTransform: 'data.{"label": name, "value": id}',

          // Allows searching for a particular field.
          url: '/api/v1/countries?name={{value}}',
          // Uses jsonata.
          // '[data.{"label": name, "value": id}]'
          // Is not the same as
          // 'data.{"label": name, "value": id}'
          // The latter will return an object if there is only one item in the array,
          // whereas the top will always return array.
          transform: '[data.{"label": name, "value": id}]'
        }
      }
    }
  }
}
