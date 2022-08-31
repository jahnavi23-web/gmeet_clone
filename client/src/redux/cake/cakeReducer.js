import { BUY_CAKE } from "./cakeTypes";

const initialState = {
  numbOfCakes: 10,
};

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numbOfCakes: state.numbOfCakes - action.payload,
      };
    default:
      return state;
  }
};

export default cakeReducer;