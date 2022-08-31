import { BUY_ICECREAM } from "./iceCreamTypes";

const initialState = {
  numbOfIceCreams: 25,
};

const iceCreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numbOfIceCreams: state.numbOfIceCreams - 1,
      };
    default:
      return state;
  }
};

export default iceCreamReducer;