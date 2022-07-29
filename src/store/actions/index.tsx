// todo why don't these enforce / raise errors?
export function setCaseInputParameter(payload: {
  key: any;
  value: any;
  case_id: any;
}) {
  return {
    type: "SET_CASE_INPUT_PARAMETER",
    payload: payload,
  };
}

export function setCaseAreaInputParameter(payload: {
  key: number;
  value: number;
  case_id: number;
  area_id: number;
}) {
  return {
    type: "SET_CASE_AREA_INPUT_PARAMETER",
    payload: payload,
  };
}

export function setCaseResults(payload: any) {
  return {
    type: "SET_CASE_RESULTS",
    payload: payload,
  };
}
