import * as d3 from "d3";

import {
  CaseResultsEmissionsProjectionByMEPCategory,
  CaseResultsTypes,
  CreatePlotPropTypes,
} from "types";
import { bindD3Element } from "dataformat/d3helpers";

import { useAppSelector } from "store/hooks";

const createMultilinePlot = (props: CreatePlotPropTypes) => {
  const {
    container_dimensions,
    container_ref,
    case_inputs,
    case_outputs,
    view_options,
  } = props;

  const svg = bindD3Element(container_ref, "svg", "plot-svg")
    .attr("height", container_dimensions.height)
    .attr("width", container_dimensions.width);

  const plot_padding = {
    t: 50,
    b: 50,
    l: 50,
    r: 50,
  };

  const ypadding = 1.15;
  const legend_height = 50;

  const legend_padding = {
    t: 50,
    b: 50,
    l: 50,
    r: 50,
  };

  const { units, grouping } = view_options.plot_options.multiline_plot_options;

  const plot_dimensions = {
    width: container_dimensions.width - plot_padding.l - plot_padding.r,
    height:
      container_dimensions.height -
      plot_padding.b -
      plot_padding.t -
      legend_height,
    t: plot_padding.t,
    l: plot_padding.l,
  };

  const legend_dimensions = {
    width: container_dimensions.width - legend_padding.l - legend_padding.r,
    height:
      container_dimensions.height -
      plot_padding.b -
      plot_padding.t -
      legend_height,
    t: plot_dimensions.height + legend_padding.t,
    l: legend_padding.l,
  };

  const plot_g = bindD3Element(svg, "g", "plot-g").attr(
    "transform",
    `translate(${plot_dimensions.l},${plot_dimensions.t})`
  );
  const axis_g = bindD3Element(svg, "g", "axis-g");
  const text_g = bindD3Element(svg, "g", "text-g");
  const legend_g = bindD3Element(svg, "g", "legend-g").attr(
    "transform",
    `translate(${legend_dimensions.l},${legend_dimensions.t})`
  );

  // create dataset.
  let data: any[] = [];
  case_inputs.case_attributes.forEach((c) => {
    let { case_id, case_name } = c;
    let case_obj = case_outputs.output_response.find(
      (d) => d.case_id === case_id
    )?.case_results
      ?.emissions_projection_by_mep_category as CaseResultsEmissionsProjectionByMEPCategory[];

    let years = [...new Set(case_obj?.map((d) => d.year))];

    let case_data: any[] = [];
    years.forEach((year) => {
      let yr_objs = case_obj.filter((d) => d.year === year);
      let val: number = 0;
      let mep_val = d3.sum(
        yr_objs.filter((d) => d.category === "mep")?.map((d) => d[units])
      );
      let non_mep_val = d3.sum(
        yr_objs.filter((d) => d.category === "non_mep")?.map((d) => d[units])
      );
      if (grouping === "mep") {
        val = mep_val;
      }
      if (grouping === "total") {
        val = mep_val + non_mep_val;
      }

      case_data.push({
        year: year,
        case_id: case_id,
        case_name: case_name,
        val: val,
      });
    });
    data.push(case_data);
  });

  //@ts-ignore
  let xmax = d3.max(data.map((d) => d3.max(d.map((e) => e.year))));
  //@ts-ignore
  let xmin = d3.min(data.map((d) => d3.min(d.map((e) => e.year))));

  //@ts-ignore

  let ymax =
    //@ts-ignore
    d3.max(data.map((d) => d3.max(d.map((e) => e.val)))) * ypadding;
  let ymin = 0;

  let xScale = d3
    .scaleLinear()
    .range([0, plot_dimensions.width])
    //@ts-ignore
    .domain([xmin, xmax]);

  let yScale = d3
    .scaleLinear()
    .range([plot_dimensions.height, 0])
    //@ts-ignore
    .domain([ymin, ymax]);

  let xaxis = d3.axisBottom(xScale);
  let yaxis = d3.axisLeft(yScale);

  let xaxis_g = bindD3Element(axis_g, "g", "x-axis-g")
    .attr(
      "transform",
      `translate(${plot_dimensions.l}, ${
        plot_dimensions.height + plot_dimensions.t
      })`
    )
    //@ts-ignore
    .call(xaxis);

  let yaxis_g = bindD3Element(axis_g, "g", "y-axis-g")
    .attr("transform", `translate(${plot_dimensions.l}, ${plot_dimensions.t})`)
    //@ts-ignore
    .call(yaxis);

  let lineFunc = d3
    .line()
    //@ts-ignore
    .x((d) => xScale(d.year))
    //@ts-ignore
    .y((d) => yScale(d.val));

  //   console.log(data.filter((d) => d.case_id === 0));
  let paths = plot_g
    .selectAll(".line-path")
    .data(data)
    .join("path")
    .attr("class", "line-path")
    .attr("d", lineFunc)
    .attr("stroke-width", "3")
    .attr("stroke", (d, i) => ["blue", "red", "yellow", "purple"][i])
    .attr("fill", "none");
};

export { createMultilinePlot };
