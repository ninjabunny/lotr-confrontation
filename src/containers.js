import { connect } from 'react-redux';
import * as components from './components';
import { deleteSelected, selectGamePiece, selectedLocation, toggleFaction} from './actions';

export const Box = connect(
  function mapStateToProps(state) {
    return { box: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatches: {
        selectGamePiece: gamepiece => dispatch(selectGamePiece(gamepiece)),
        selectedLocation: location => dispatch(selectedLocation(location)),
        toggleFaction: () => dispatch(toggleFaction()),
        deleteSelected: () => dispatch(deleteSelected())
      }
      
    };
  }
)(components.Box);