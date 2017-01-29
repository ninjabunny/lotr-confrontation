import { fb } from './firebase';

const init = {
  locations: [
    {
      name: 'Mordor',
      members: ['balrog', 'blackrider', 'cavetroll', 'nazgul']
    },
    {
      name: 'Dacorlad',
      members: ['orcs']
    },
    {
      name: 'Gondor',
      members: ['saruman']
    },
    {
      name: 'Wirkwood',
      members: ['shelob']
    },
    {
      name: 'Fangorn',
      members: ['warg']
    },
    {
      name: 'Rohan',
      members: ['witchking']
    },
    {
      name: 'The High Pass',
      members: ['']
    },
    {
      name: 'Misty Mountains',
      members: ['']
    },
    {
      name: 'Caradhras',
      members: ['']
    },
    {
      name: 'Gate of Rohan',
      members: ['']
    },
    {
      name: 'Rhudaur',
      members: ['sam']
    },
    {
      name: 'Eregion',
      members: ['pippin']
    },
    {
      name: 'Eneowaith',
      members: ['merry']
    },
    {
      name: 'Artheham',
      members: ['legolas']
    },
    {
      name: 'Cardolan',
      members: ['gimli']
    },
    {
      name: 'The Shire',
      members: ['aragorn', 'boromir', 'frodo', 'gandalf']
    }
  ],
  selected: {location: '', member: ''},
  faction: 'fellowship'
};

export default function reducer(state=init, action) {
  console.log('Dispatched Action: ', action);
  switch(action.type) {
    case 'DELETE_SELECTED':
      state.locations.map(location => {
        if(location.members) {
          let index = location.members.indexOf(state.selected.member);
          if (index !== -1) {
            location.members.splice(index, 1);  
          }  
        }
      });
      state.selected.member = '';
      return Object.assign({}, state);
    case 'TOGGLE_FACTION':
      state.faction = (state.faction === 'fellowship') ? 'sauron' : 'fellowship';
      return Object.assign({}, state);
    case 'FIREBASE_SYNC':
      state.locations = action.payload;
      return Object.assign({}, state);
    case 'SELECT_LOCATION':
      //remove the previous member
      state.locations.map(location => {
        if(location.members) {
          let index = location.members.indexOf(state.selected.member);
          if (index !== -1) {
            location.members.splice(index, 1);  
          }  
        }
      });
      if ( state.selected.member !== '') {
        //add member
        if (state.selected.member) {
          let match = state.locations.filter(location => {
            return location.name === action.location;
          });
          if (match[0].members){
            match[0].members.push(state.selected.member)
          } else {
            match[0].members = [state.selected.member];
          }
          state.selected.member = '';  
        }
        

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

