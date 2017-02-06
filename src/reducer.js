import { fb } from './firebase';


const time = () => {
  const date = new Date();
  return date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds()) + ' ';  
}
const init = {
  locations: [
    {
      name: 'Mordor',
      members: ['balrog', 'blackrider', 'cavetroll', 'nazgul']
    },
    {
      name: 'Dagorlad',
      members: ['orcs']
    },
    {
      name: 'Gondor',
      members: ['saruman']
    },
    {
      name: 'Mirkwood',
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
      name: 'Enedwaith',
      members: ['merry']
    },
    {
      name: 'Arthedain',
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
  faction: 'fellowship',
  msgs: [],
  movedTo: ''
};

export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function reducer(state=init, action) {
  console.log('Dispatched Action: ', action);
  if (!state.msgs) {
    state.msgs = [];
  }

  if (!state.movedTo) {
    state.movedTo = '';
  }

  switch(action.type) {
    case 'DELETE_SELECTED':
      let msg = state.faction + ': ' + state.selected.member + ' has been defeated.';
      state.locations.map(location => {
        if(location.members) {
          let index = location.members.indexOf(state.selected.member);
          if (index !== -1) {
            location.members.splice(index, 1);  
          }  
        }
      });
      state.selected.member = '';

      //update messages
      state.msgs.unshift({
        faction: state.faction,
        text:time() + msg
      });

      //update firebase
      fb.set({
        locations: state.locations,
        msgs: state.msgs,
        movedTo: state.movedTo
      });
      return Object.assign({}, state);
    case 'TOGGLE_FACTION':
      state.faction = (state.faction === 'fellowship') ? 'sauron' : 'fellowship';
      return Object.assign({}, state);
    case 'FIREBASE_SYNC':
      state.locations = action.payload.locations;
      state.msgs = action.payload.msgs;
      state.movedTo = action.payload.movedTo;
      return Object.assign({}, state);
    case 'SELECT_LOCATION':
      let from, to;
      //remove the previous member
      state.locations.map(location => {
        if(location.members) {
          let index = location.members.indexOf(state.selected.member);
          if (index !== -1) {
            from = location.name;
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
          to = match[0].name;

          if (match[0].members){
            match[0].members.push(state.selected.member)
          } else {
            match[0].members = [state.selected.member];
          }
          state.selected.member = '';  
        }

        let msg = state.faction + ' has moved from ' + from + ' to ' + to + '.'
        if (from === 'Eregion' && to === 'Fangorn') {
          msg = state.faction + ' has used Moria to get from Eregion to Fangorn. Check to see if Balrog is in Caradhras. If so, destroy fellowship character.';
        }

        //update messages
        state.msgs.unshift({
          faction: state.faction,
          text: time() + msg
        });

        //update movedTo
        state.movedTo = to;

        //update firebase
        fb.set({
          locations: state.locations,
          msgs: state.msgs,
          movedTo: state.movedTo
        });
      } else {
        let match = state.locations.filter(location => {
          return location.name === action.location;
        });
        if (match[0].members.length > 1) {
          match[0].members = shuffle(match[0].members);
        }
        
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

