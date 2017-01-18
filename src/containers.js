import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo, selectGamePiece} from './actions';

export const Box = connect(
  function mapStateToProps(state) {
  	console.log('state', state)
  	//this guy maps the state to the props of parenets?
    return { box: state };
  },
  function mapDispatchToProps(dispatch) {
  	//this thing adds dispatch functions so that the props can use them
  	console.log('dispatch', dispatch)
    return {
      addTodo: text => dispatch(addTodo(text)),
      toggleTodo: id => dispatch(toggleTodo(id)),
      selectGamePiece: gamepiece => dispatch(selectGamePiece(gamepiece))
    };
  }
)(components.Box);

