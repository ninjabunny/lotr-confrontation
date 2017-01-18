import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo, selectGamePiece, selectedLocation} from './actions';

export const Box = connect(
  function mapStateToProps(state) {
  	console.log('state', state)
    return { box: state };
  },
  function mapDispatchToProps(dispatch) {
  	console.log('dispatch', dispatch)
    return {
      dispatches: {
        selectGamePiece: gamepiece => dispatch(selectGamePiece(gamepiece)),
        selectedLocation: location => dispatch(selectedLocation(location)),  
      }
      
    };
  }
)(components.Box);