const CHANGE_COLUMN = "CHANGE_COLUMN";

export const changeIndex = (payload) => ({ type: CHANGE_COLUMN, payload });

const initialState = { 0: "name", 1: "tagline", 2: "abv" };

export default function column(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLUMN:
      return {
        ...state,
        [action.payload[0]]: state[action.payload[1]],
        [action.payload[1]]: state[action.payload[0]],
      };
    default:
      return state;
  }
}
