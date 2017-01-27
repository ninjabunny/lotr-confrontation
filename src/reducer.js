import { fb } from './firebase';

const init = {
  locations: [
    {
      name: 'dogtown',
      members: ['orcs', 'aragorn']
    },
    {
      name: 'ludeville',
      members: ['balrog']
    }
  ],
  selected: {location: '', member: ''},
};

export default function reducer(state=init, action) {
  console.log('Dispatched Action: ', action);
  switch(action.type) {
    case 'FIREBASE_SYNC':
      state.locations = action.payload;
      return Object.assign({}, state);
    case 'SELECT_LOCATION':
      //remove the previous member
      state.locations.map(location => {
        let index = location.members.indexOf(state.selected.member);
        if (index !== -1) {
          location.members.splice(index, 1);  
        }
      });
      if ( state.selected.member !== '') {
        //add member
        state.locations.filter(location => {
          return location.name === action.location;
        })[0].members.push(state.selected.member);
        state.selected.member = '';

        //update firebase
        fb.set(state.locations);
      }
      return Object.assign({}, state)
    case 'SELECT_GAME_PIECE':
      if(state.selected.member === action.gamepiece) {
        state.selected.member = '';
      } else {
        state.selected.member = action.gamepiece;
      }
      return Object.assign({}, state)
    default:
      return state;
  }
}

