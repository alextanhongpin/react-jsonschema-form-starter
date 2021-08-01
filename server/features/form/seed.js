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
        default: 'Chuck',
        minLength: 1
      },
      lastName: {
        type: 'string',
        title: 'Last name',
        minLength: 1
      },
      age: {
        type: 'number',
        title: 'Age',
        minimum: 0,
        maximum: 150
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
    }
  }
}
