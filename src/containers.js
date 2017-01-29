import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo, selectGamePiece, selectedLocation, toggleFaction} from './actions';

export const Box = connect(
  function mapStateToProps(state) {
    return { box: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatches: {
        selectGamePiece: gamepiece => dispatch(selectGamePiece(gamepiece)),
        selectedLocation: location => dispatch(selectedLocation(location)),
        toggleFaction: () => dispatch(toggleFaction())
      }
      
    };
  }
)(components.Box);