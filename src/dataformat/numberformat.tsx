import * as d3 from "d3";

export const formatNumber = (val: number, decimals = 2) =>
  d3.format(`,.${decimals}f`)(val);

export const formatCurrency = (val: number, decimals = 0) =>
  d3.format(`$,.${decimals}f`)(val);
