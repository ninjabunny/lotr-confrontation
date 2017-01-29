const uid = () => Math.random().toString(34).slice(2);

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

export function firebaseSync(payload) {
  return {
    type: 'FIREBASE_SYNC',
    payload: payload
  }
}

export function toggleFaction() {
  return {
    type: 'TOGGLE_FACTION',
  }
}

export function deleteSelected() {
  return {
    type: 'DELETE_SELECTED',
  }
}