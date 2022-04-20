/* building actions */
export function setCaseResults(data) {
  return {
    type: "SET_CASE_RESULTS",
    payload: data,
  };
}

export function setCaseInputs(data) {
  return {
    type: "SET_CASE_INPUTS",
    payload: data,
  };
}

export function setCaseHeatingAndDomesticCOP(payload) {
  return {
    type: "SET_CASE_HEATING_AND_DOMESTIC_COP",
    payload: payload,
  };
}

export function setCaseHeatingAndDomesticFuelSource(payload) {
  return {
    type: "SET_CASE_HEATING_AND_DOMESTIC_FUEL_SOURCE",
    payload: payload,
  };
}

export function setCaseName(payload) {
  return {
    type: "SET_CASE_NAME",
    payload: payload,
  };
}

export function setCaseHeatingTemplate(payload) {
  return {
    type: "SET_CASE_HEATING_TEMPLATE",
    payload: payload,
  };
}

export function setCaseIsDisplayed(payload) {
  return {
    type: "SET_CASE_IS_DISPLAYED",
    payload: payload,
  };
}

export function setBaseCase(payload) {
  return {
    type: "SET_BASE_CASE",
    payload: payload,
  };
}

/* general ui actions */
export function setWindowDimensions(dims) {
  return {
    type: "SET_WINDOW_DIMENSIONS",
    payload: dims,
  };
}

export function setIsLoading(bool) {
  return {
    type: "SET_IS_LOADING",
    payload: bool,
  };
}

/* plot config options */
export function setPlotConfig(config) {
  return {
    type: "SET_PLOT_CONFIG",
    payload: config,
  };
}

export function setThresholdView(val) {
  return {
    type: "SET_THRESHOLD_VIEW",
    payload: val,
  };
}

export function setGlobalCaseParameters(obj) {
  return {
    type: "SET_GLOBAL_CASE_PARAMETERS",
    payload: obj,
  };
}

export function setIsPlotHover(payload) {
  return {
    type: "SET_IS_PLOT_HOVER",
    payload: payload,
  };
}
