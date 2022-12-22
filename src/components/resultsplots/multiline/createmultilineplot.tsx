//@ts-nocheck
import * as d3 from "d3";

import {
  CaseResultsEmissionsProjectionByMEPCategory,
  CreatePlotPropTypes,
  PlotDimensionType,
} from "types";
import { bindD3Element } from "dataformat/d3helpers";
import { getClosestYear } from "../hover";
import { getCaseDisplayAttributes } from "../getcasedisplay";

const createMultilinePlot = (props: CreatePlotPropTypes) => {
  const {
    container_dimensions,
    container_ref,
    case_inputs,
    case_outputs,
    view_options,
    svg_components,
  } = props;

  const { units, grouping } = view_options.plot_options.multiline_plot_options;

  const {
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
    hover_g,
    hover_rect,
    hover_line,
  } = svg_components;

  title_text.text(
    grouping === "mep"
      ? "Operational Carbon Over Time, HVAC & DHW Only"
      : "Operational Carbon Over Time, Whole Building"
  );

  y_text.text(units === "kg_co2_absolute" ? "kg CO2e/yr" : "kg CO2e/sf/yr");

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

  let xmax = d3.max(data.map((d) => d3.max(d.map((e) => e.year))));
  let xmin = d3.min(data.map((d) => d3.min(d.map((e) => e.year))));

  let ymax = d3.max(data.map((d) => d3.max(d.map((e) => e.val)))) * y_padding;
  let ymin = 0;

  let xScale = d3
    .scaleLinear()
    .range([0, plot_dimensions.width])
    .domain([xmin, xmax]);

  let yScale = d3
    .scaleLinear()
    .range([plot_dimensions.height, 0])
    .domain([ymin, ymax]);

  let xaxis = d3.axisBottom(xScale).tickFormat((d: number) => d.toString());
  let yaxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(d3.format(units === "kg_co2_absolute" ? "~s" : ".3"));

  let xaxis_g = bindD3Element(axis_g, "g", "x-axis-g")
    .attr("transform", `translate(${0},${plot_dimensions.height})`)

    .call(xaxis);

  let yaxis_g = bindD3Element(axis_g, "g", "y-axis-g").call(yaxis);

  let lineFunc = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.val));

  let paths = plot_g
    .selectAll(".line-path")
    .data(data)
    .join("path")
    .attr("class", "line-path")
    .attr("d", lineFunc)
    .attr("stroke-width", "3")
    .attr("stroke", (d: any, i: number) => {
      let case_id = d[0]?.case_id as number;
      let color = case_display_attributes.find((d) => d.case_id === case_id)
        ?.color as string;
      return color;
    })
    .attr("fill", "none");

  gridlines_g.call(
    d3.axisLeft(yScale).ticks(5).tickSize(-plot_dimensions.width)
  );

  gridlines_g
    .selectAll("line")
    .attr("stroke", "gray")
    .style("stroke-dasharray", "2 2");

  gridlines_g.selectAll("text").remove();
  gridlines_g.selectAll(".domain").remove();

  // handle axis formatting
  yaxis_g.selectAll("line").remove();
  yaxis_g.selectAll(".domain").remove();

  xaxis_g.selectAll(".domain").remove();

  /* legend */

  let legend_items = legend_g
    .selectAll(".legend-item-g")
    .data(case_display_attributes)
    .join("g")
    .attr("class", "legend-item-g");

  legend_items.each(function (d: any, i: number) {
    let row = d3.select(this);
    let legend_text_pad = 30;

    bindD3Element(row, "text", "row-text")
      .attr("x", legend_text_pad)
      .attr("y", () => i * legend_row_padding + legend_row_padding)
      .text(d.case_name)
      .style("font-size", "14px");

    bindD3Element(row, "path", "row-rect")
      .attr("d", d.icon)
      .attr(
        "transform",
        () =>
          `translate(0,${
            i * legend_row_padding + legend_row_padding / 2
          }) scale(1)`
      )
      .attr("fill", d.color)
      .attr("stroke", d.color);
  });

  let years = data[0].map((d) => d.year);

  hover_rect.on("mousemove", function (event, d) {
    let closest_year = getClosestYear(years, event, xScale);
    hover_line.attr("opacity", 1);
    hover_line.attr("x1", xScale(closest_year));
    hover_line.attr("x2", xScale(closest_year));
  });
  hover_rect.on("mouseover", function (event, d) {});
  hover_rect.on("mouseout", function (event, d) {
    hover_line.attr("opacity", 0);
  });
};

export { createMultilinePlot };
