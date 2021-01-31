import * as actionTypes from './actionTypes';

// export const counterIncriment = () => ({ type: actionTypes.counterIncriment });
// export const counterDecriment = () => ({ type: actionTypes.counterDecriment });

export const cIncrement = () => async dispatch => {
    dispatch({
        type: actionTypes.COUNTER_INCRIMENT,
        payload: ['1']
    })
}
