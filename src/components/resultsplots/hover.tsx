import * as d3 from "d3";
export const getClosestYear = (years: number[], event: any, xScale: any) => {
  let [x, y] = d3.pointer(event);
  let mouse_year = xScale.invert(x);
  let closest_year = 9e9;
  let current_delta = 9e9;
  years.forEach((year) => {
    let delta_year = Math.abs(mouse_year - year);
    if (delta_year < current_delta) {
      closest_year = year;
      current_delta = delta_year;
    }
  });

  return closest_year;
};
