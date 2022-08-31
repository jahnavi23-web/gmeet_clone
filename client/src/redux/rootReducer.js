import cakeReducer from "./cake/cakeReducer";
import iceCreamReducer from "./iceCream/iceCreamReducer";
import userReducer from "./user/userReducer";
import buttonReducer from "./button/buttonReducer";
import meetReducer from "./meet/meetReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  button: buttonReducer,
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  user: userReducer,
  meet: meetReducer,
});
export default rootReducer;
