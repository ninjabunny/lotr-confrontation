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