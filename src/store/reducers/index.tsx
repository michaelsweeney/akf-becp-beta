import { combineReducers } from "redux";

import caseInputReducer from "./caseinputreducer";
import caseOutputReducer from "./caseoutputreducer";

const rootReducer = combineReducers({
  case_inputs: caseInputReducer,
  case_outputs: caseOutputReducer,
});

export default rootReducer;
