const initialState = {
  /* 
  activePlot enduse options:
    - stacked
    - multiline
  */

  thresholdView: "none",
};

export default function plotReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PLOT_CONFIG": {
      return {
        ...action.payload,
      };
    }

    case "SET_THRESHOLD_VIEW": {
      return {
        ...state,
        thresholdView: action.payload,
      };
    }

    default:
      return state;
  }
}
