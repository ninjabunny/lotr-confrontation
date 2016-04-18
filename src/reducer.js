import { OrderedMap } from 'immutable';

const init = OrderedMap();

export default function reducer(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return todos.set(action.payload.id, action.payload);
    case 'TOGGLE_TODO':
      return todos.updateIn(
        [action.payload, 'isDone'],
        isDone => !isDone
      );
    default:
      return todos;
  }
}

