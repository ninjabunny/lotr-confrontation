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
      if ( state.selected.member !== '') {
        //remove the previous member
        state.locations.map(location => {
          let index = location.members.indexOf(state.selected.member);
          if (index !== -1) {
            location.members.splice(index, 1);  
          }
        });

        //add member
        state.locations.filter(location => {
          return location.name === action.location;
        })[0].members.push(state.selected.member);
        state.selected.member = '';
      }
      return Object.assign({}, state)
    case 'SELECT_GAME_PIECE':
      state.selected.member = action.gamepiece;
      return Object.assign({}, state)
    default:
      return state;
  }
}

