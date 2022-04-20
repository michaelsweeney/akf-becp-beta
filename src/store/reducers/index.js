import { combineReducers } from "redux";

import uiReducer from "./uireducer";
import caseInputReducer from "./caseinputreducer";
import caseOutputReducer from "./caseoutputreducer";
import plotReducer from "./plotreducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  case_inputs: caseInputReducer,
  case_outputs: caseOutputReducer,
  plot_config: plotReducer,
});

export default rootReducer;
