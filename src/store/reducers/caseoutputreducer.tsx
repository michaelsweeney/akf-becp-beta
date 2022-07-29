import { OutputStateTypes, ActionPayload } from "../statetypes";

// todo .api work should go here: each of these should be specifically typed.
const initialState: OutputStateTypes = {
  case_results: [],
  case_comparison_displayed: [],
  case_results_displayed: [],
  icon_array_displayed: [],
  is_loading_error: false,
};

export default function buildingReducer(
  state = initialState,
  action: ActionPayload
) {
  switch (action.type) {
    case "SET_CASE_RESULTS": {
      if (action.payload === false) {
        return {
          ...state,
          is_loading_error: true,
        };
      } else {
        return {
          ...state,
          ...action.payload,
          is_loading_error: false,
        };
      }
    }

    default:
      return state;
  }
}
