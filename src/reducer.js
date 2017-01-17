import { List, Map } from 'immutable';

const init = {
  locations: {
    dogtown: {
      name: 'dogtown',
      members: ['billy', 'sue']
    },
    ludeville: {
      name: 'ludeville',
      members: ['bob']
    }
  }
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

