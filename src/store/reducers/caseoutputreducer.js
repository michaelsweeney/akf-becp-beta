const initialState = {
  case_results: [],
  case_comparison_displayed: [],
  case_results_displayed: [],
  icon_array_displayed: [],
  isLoadingError: false,
};

export default function buildingReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CASE_RESULTS": {
      if (action.payload === false) {
        return {
          ...state,
          isLoadingError: true,
        };
      } else {
        return {
          ...state,
          ...action.payload,
          isLoadingError: false,
        };
      }
    }

    default:
      return state;
  }
}
