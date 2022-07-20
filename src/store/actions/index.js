



export function setCaseInputParameter(payload) {
  // payload: {key, value, case_id}
  return {
    type: "SET_CASE_INPUT_PARAMETER",
    payload: payload,
  }
}

export function setCaseAreaInputParameter(payload) {
  // payload: {key, value, case_id, area_id}
  return {
    type: "SET_CASE_AREA_INPUT_PARAMETER",
    payload: payload,
  }
}

export function setCaseResults(data) {
  return {
    type: "SET_CASE_RESULTS",
    payload: data,
  };
}








/* general ui actions */
export function setWindowDimensions(dims) {
  return {
    type: "SET_WINDOW_DIMENSIONS",
    payload: dims,
  };
}