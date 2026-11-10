import * as T from '../actionTypes';

export default function filterReducer(state = 'all', action) {
  switch (action.type) {
    case T.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
