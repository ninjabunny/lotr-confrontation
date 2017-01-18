import { List, Map } from 'immutable';

const init = {
  locations: [
    {
      name: 'dogtown'
    },
    {
      name: 'ludeville'
    }
  ],
  selected: {location: '', member: ''},
  members: [
    {name: 'jill', location: 'dogtown'},
    {name: 'bob', location: 'ludeville'},
    {name: 'george', location: 'ludeville'}
  ]
};

export default function reducer(todos=init, action) {
  console.log('Dispatched Action: ', action);
  switch(action.type) {
    case 'ADD_TODO':
      return todos.push(Map(action.payload));
    case 'TOGGLE_TODO':
      return todos.map(t => {
        if(t.get('id') === action.payload) {
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
    default:
      return todos;
  }
}

