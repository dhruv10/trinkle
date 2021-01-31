import * as actionTypes from './actionTypes';

export const updateDistance = (distanceInKM) => async dispatch => {
    dispatch({
        type: actionTypes.UPDATE_TOTAL_DISTANCE,
        payload: distanceInKM
    })
}
