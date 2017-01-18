import { List, Map } from 'immutable';

const init = {
  locations: [
    {
      name: 'dogtown',
      members: ['jill', 'bob']
    },
    {
      name: 'ludeville',
      members: ['chicken']
    }
  ],
  selected: {location: '', member: ''},
};

export default function reducer(state=init, action) {
  console.log('Dispatched Action: ', action);
  switch(action.type) {
    case 'SELECT_LOCATION':
      console.log('Reducer: Location Selected: ',  action.location)
      return state;
    case 'SELECT_GAME_PIECE':
      console.log('Reducer: Game Piece Selected: ',  action.gamepiece)
      return state;
    default:
      return state;
  }
}

