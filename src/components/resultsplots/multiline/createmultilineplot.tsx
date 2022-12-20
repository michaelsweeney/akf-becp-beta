import * as d3 from "d3";

import {
  CaseResultsEmissionsProjectionByMEPCategory,
  CaseResultsTypes,
  CreatePlotPropTypes,
  PlotDimensionType,
} from "types";
import { bindD3Element } from "dataformat/d3helpers";

import { useAppSelector } from "store/hooks";

import { getCaseDisplayAttributes } from "../getcasedisplay";

const createMultilinePlot = (props: CreatePlotPropTypes) => {
  const {
    container_dimensions,
    container_ref,
    case_inputs,
    case_outputs,
    view_options,
  } = props;

  const svg = bindD3Element(container_ref, "svg", "plot-multiline-svg")
    .attr("height", container_dimensions.height)
    .attr("width", container_dimensions.width);

  const orientation: "horizontal" | "vertical" = "horizontal";

  const plot_padding = {
    t: 30,
    b: 20,
    l: 75,
    r: 5,
  };

  const ypadding = 1.15;
  const horizontal_legend_height = 50;
  const vertical_legend_width = 300;

  const legend_padding = {
    t: 20,
    b: 20,
    l: 5,
    r: 5,
  };

  const { units, grouping } = view_options.plot_options.multiline_plot_options;

  let legend_dimensions = {} as PlotDimensionType;
  let plot_dimensions = {} as PlotDimensionType;
  if (orientation === "horizontal") {
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
  } else if (orientation === "vertical") {
    plot_dimensions = {
      width: container_dimensions.width - plot_padding.l - plot_padding.r,
      height:
        container_dimensions.height -
        plot_padding.b -
        plot_padding.t -
        horizontal_legend_height,
      t: plot_padding.t,
      l: plot_padding.l,
    };

    legend_dimensions = {
      width: container_dimensions.width - legend_padding.l - legend_padding.r,
      height: horizontal_legend_height,
      t:
        plot_dimensions.height +
        plot_padding.t +
        plot_padding.b +
        legend_padding.t,
      l: legend_padding.l,
    };
  }

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

  //  legend border rect
  // const legend_border = bindD3Element(legend_g, "rect", "legend-rect")
  // .attr("width", legend_dimensions.width)
  // .attr("height", legend_dimensions.height);
  // .attr("fill", "rgba(200,200,200,0.15");
  // plot border rect
  const plot_border = bindD3Element(plot_g, "rect", "legend-rect")
    .attr("width", plot_dimensions.width)
    .attr("height", plot_dimensions.height)
    .attr("fill", "none")
    .attr("stroke", "gray");

  const title_text = bindD3Element(text_g, "text", "title-text")
    .attr("x", plot_dimensions.l)
    .attr("y", 15)
    .style("text-anchor", "left")
    .text(
      grouping === "mep"
        ? "Operational Carbon Over Time, HVAC & DHW Only"
        : "Operational Carbon Over Time, Whole Building"
    );

  const y_text = bindD3Element(text_g, "text", "y-axis-text")
    .attr("x", -plot_dimensions.height / 2)
    .attr("y", plot_dimensions.l / 2)
    .attr("transform", "rotate(270)")
    .style("text-anchor", "middle")

    .text(units === "kg_co2_absolute" ? "kg CO2e/yr" : "kg CO2e/sf/yr");

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

  let case_display_attributes = getCaseDisplayAttributes(case_inputs);

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

  let xaxis = d3.axisBottom(xScale).tickFormat((d: number) => d.toString());
  let yaxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(d3.format(units === "kg_co2_absolute" ? "~s" : ".3"));

  let xaxis_g = bindD3Element(axis_g, "g", "x-axis-g")
    .attr("transform", `translate(${0},${plot_dimensions.height})`)
    //@ts-ignore
    .call(xaxis);

  let yaxis_g = bindD3Element(axis_g, "g", "y-axis-g")
    //@ts-ignore
    .call(yaxis);

  let lineFunc = d3
    .line()
    //@ts-ignore
    .x((d) => xScale(d.year))
    //@ts-ignore
    .y((d) => yScale(d.val));

  let paths = plot_g
    .selectAll(".line-path")
    .data(data)
    .join("path")
    .attr("class", "line-path")
    .attr("d", lineFunc)
    .attr("stroke-width", "3")
    .attr("stroke", (d, i) => {
      let case_id = d[0]?.case_id as number;
      let color = case_display_attributes.find((d) => d.case_id === case_id)
        ?.color as string;

      return color;
    })
    .attr("fill", "none");

  gridlines_g
    .call(
      //@ts-ignore
      d3.axisLeft(yScale).ticks(5).tickSize(-plot_dimensions.width)
    )
    .style("stroke-dasharray", "2 2");

  gridlines_g.selectAll("line").attr("stroke", "gray");

  gridlines_g.selectAll("text").remove();
  gridlines_g.selectAll(".domain").remove();

  // handle axis formatting
  yaxis_g.selectAll("line").remove();
  yaxis_g.selectAll(".domain").remove();

  // xaxis_g.selectAll("line").remove();
  xaxis_g.selectAll(".domain").remove();

  /* legend */

  let row_padding = 35;

  console.log(case_display_attributes);

  let legend_items = legend_g
    .selectAll(".legend-item-g")
    .data(case_display_attributes)
    .join("g")
    .attr("class", "legend-item-g");

  legend_items.each(function (d, i) {
    let row = d3.select(this);
    let rect_size = 30;

    bindD3Element(row, "text", "row-text")
      .attr("x", rect_size + 10)
      .attr("y", () => i * row_padding + row_padding)
      .text(d.case_name);

    bindD3Element(row, "path", "row-rect")
      .attr("height", rect_size)
      .attr("width", rect_size)
      .attr("d", d.icon)
      .attr(
        "transform",
        () => `translate(0,${i * row_padding + row_padding / 2}) scale(1)`
      )
      .attr("fill", d.color)
      .attr("stroke", d.color);
  });
};

export { createMultilinePlot };
