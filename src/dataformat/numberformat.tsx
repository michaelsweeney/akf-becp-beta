import * as d3 from "d3";

export const formatNumber = (val: number, decimals = 2) => {
  if (val < 1) {
    return d3.format(`,.2f`)(val);
  } else if (val < 10) {
    return d3.format(",.2f")(val);
  } else if (val < 100) {
    return d3.format(`,.1f`)(val);
  } else {
    return d3.format(",.0f")(val);
  }
};

export const formatCurrency = (val: number, decimals = 0) =>
  d3.format(`$,.${decimals}f`)(val);
