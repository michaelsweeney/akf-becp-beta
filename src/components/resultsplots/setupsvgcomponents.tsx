import { ContainerDimensionTypes, PlotDimensionType } from "types";
import { bindD3Element } from "dataformat/d3helpers";

const setupSVGComponents = (
  container_dimensions: ContainerDimensionTypes,
  container_ref: HTMLDivElement,
  svglabel: string
) => {
  const svg = bindD3Element(container_ref, "svg", svglabel)
    .attr("height", container_dimensions.height)
    .attr("width", container_dimensions.width);

  const plot_padding = {
    t: 40,
    b: 50,
    l: 75,
    r: 10,
  };

  const y_padding = 1.15;
  const vertical_legend_width = 300;

  const legend_padding = {
    t: 35,
    b: 20,
    l: 5,
    r: 5,
  };

  const legend_row_padding = 30;

  let legend_dimensions = {} as PlotDimensionType;
  let plot_dimensions = {} as PlotDimensionType;

  plot_dimensions = {
    width:
      container_dimensions.width -
      plot_padding.l -
      plot_padding.r -
      vertical_legend_width,
    height: container_dimensions.height - plot_padding.b - plot_padding.t,
    t: plot_padding.t,
    l: plot_padding.l,
  };

  legend_dimensions = {
    width: vertical_legend_width - legend_padding.l - legend_padding.r,
    height: container_dimensions.height - legend_padding.t - legend_padding.b,
    t: legend_padding.t,
    l:
      plot_dimensions.width +
      plot_padding.l +
      plot_padding.r +
      legend_padding.l,
  };

  const plot_g = bindD3Element(svg, "g", "plot-g").attr(
    "transform",
    `translate(${plot_dimensions.l},${plot_dimensions.t})`
  );
  const gridlines_g = bindD3Element(svg, "g", "gridlines-g").attr(
    "transform",
    `translate(${plot_dimensions.l},${plot_dimensions.t})`
  );
  const axis_g = bindD3Element(svg, "g", "axis-g").attr(
    "transform",
    `translate(${plot_dimensions.l},${plot_dimensions.t})`
  );
  const text_g = bindD3Element(svg, "g", "text-g");
  const legend_g = bindD3Element(svg, "g", "legend-g").attr(
    "transform",
    `translate(${legend_dimensions.l},${legend_dimensions.t})`
  );

  const plot_border = bindD3Element(plot_g, "rect", "legend-rect")
    .attr("width", plot_dimensions.width)
    .attr("height", plot_dimensions.height)
    .attr("fill", "none")
    .attr("stroke", "gray");
  const title_text = bindD3Element(text_g, "text", "title-text")
    .attr("x", plot_dimensions.l)
    .attr("y", 25)
    .style("text-anchor", "left")
    .classed("plot-title", true);
  const y_text = bindD3Element(text_g, "text", "y-axis-text")
    .attr("x", -plot_dimensions.height / 2 - plot_padding.t)
    .attr("y", plot_dimensions.l / 2)
    .attr("transform", "rotate(270)")
    .style("text-anchor", "middle")
    .classed("axis-title", true);

  return {
    svg,
    plot_padding,
    y_padding,
    vertical_legend_width,
    legend_padding,
    plot_dimensions,
    legend_dimensions,
    plot_g,
    gridlines_g,
    axis_g,
    text_g,
    legend_g,
    plot_border,
    legend_row_padding,
    title_text,
    y_text,
  };
};

export { setupSVGComponents };
