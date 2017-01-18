const uid = () => Math.random().toString(34).slice(2);

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: uid(),
      isDone: false,
      text: text
    }
  };
}

export function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    payload: id
  };
}

export function selectGamePiece(gamepiece) {
  return {
    type: 'SELECT_GAME_PIECE',
    gamepiece: gamepiece
  };
}

export function selectedLocation(location) {
  return {
    type: 'SELECT_LOCATION',
    location: location
  };
}

export function removeMemberFromLocation(member, location) {
  return {
    type: 'REMOVE_MEMBER_FROM_LOCATION',
    member: member,
    location: location
  };
}

export function addMemeberToLocation(member, location) {
  return {
    type: 'ADD_MEMBER_TO_LOCATION',
    member: member,
    location: location
  };
}