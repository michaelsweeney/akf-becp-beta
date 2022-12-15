import * as d3 from "d3";
import { CreatePlotPropTypes } from "types";
import { bindD3Element } from "dataformat/d3helpers";

const createStackedPlot = (props: CreatePlotPropTypes) => {
  const { container_dimensions, container_ref } = props;
  const svg = bindD3Element(container_ref, "svg", "plot-svg")
    .attr("height", container_dimensions.height)
    .attr("width", container_dimensions.width);

  let rect = bindD3Element(svg, "rect", "rect-xx")
    .attr("x", 2)
    .attr("y", 2)
    .attr("width", container_dimensions.width * 0.95)
    .attr("height", container_dimensions.height * 0.95)
    .attr("fill", "rgba(100,200,100,0.5)");
};

export { createStackedPlot };
