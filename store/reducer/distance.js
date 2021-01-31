import * as actionTypes from '../actions/actionTypes';

const initialState = {
  distance: 0.969,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TOTAL_DISTANCE:
      console.log(state.distance, action.payload);
      return {
        distance: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
