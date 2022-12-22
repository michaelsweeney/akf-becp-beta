//@ts-nocheck
import * as d3 from "d3";
import { CreatePlotPropTypes } from "types";
import { bindD3Element } from "dataformat/d3helpers";
import { getClosestYear } from "../hover";
import {
  electricity_icon_path,
  gas_icon_path,
  mep_icon_path,
  non_mep_icon_path,
} from "components/svgicons";

const colorslookup = {
  mep: d3.schemeTableau10[6],
  non_mep: d3.schemeTableau10[3],
  Electricity: d3.schemeTableau10[0],
  "Natural Gas": d3.schemeTableau10[4],
};

const labelslookup = {
  mep: "MEP",
  non_mep: "Non-MEP",
  Electricity: "Electricity",
  "Natural Gas": "Natural Gas",
};

const iconslookup = {
  mep: mep_icon_path,
  non_mep: non_mep_icon_path,
  Electricity: electricity_icon_path,
  "Natural Gas": gas_icon_path,
};

const createStackedPlot = (props: CreatePlotPropTypes) => {
  const {
    container_dimensions,
    container_ref,
    case_inputs,
    case_outputs,
    view_options,
    svg_components,
  } = props;

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

  const { units, current_case_id, grouping } =
    view_options.plot_options.stacked_plot_options;

  let case_name = case_inputs.case_attributes.find(
    (d) => d.case_id === current_case_id
  )?.case_name;

  let grouping_key =
    grouping === "category"
      ? "emissions_projection_by_mep_category"
      : "emissions_projection_by_fuel";
  let unit_key =
    units === "kg_co2_absolute" ? "kg_co2_absolute" : "kg_co2_per_sf";

  let case_data = case_outputs.output_response.find(
    (d) => d.case_id === current_case_id
  )?.case_results[grouping_key];

  if (case_data) {
    let val_key = grouping === "category" ? "category" : "fuel";

    let stack_keys: string[] = [...new Set(case_data.map((d) => d[val_key]))];
    // reorder stacking
    if (
      stack_keys.includes("Electricity") &&
      stack_keys.includes("Natural Gas")
    ) {
      stack_keys = ["Natural Gas", "Electricity"];
    }
    if (stack_keys.includes("mep") && stack_keys.includes("non_mep")) {
      stack_keys = ["mep", "non_mep"];
    }

    let years = [...new Set(case_data.map((d: any) => d.year))];
    let data_to_stack: any[] = [];
    years.forEach((year) => {
      let to_stack_obj = { year: year };
      stack_keys.forEach((key) => {
        let query = case_data.find(
          (d: any) => d.year === year && d[val_key] === key
        );

        if (query !== undefined) {
          to_stack_obj[key] = query[unit_key];
        }
      });
      data_to_stack.push(to_stack_obj);
    });

    let stack_data = d3.stack().keys(stack_keys)(data_to_stack);
    let areaFunc = d3
      .area()
      .x((d) => {
        return xScale(d.data.year);
      })
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

    let xarray = case_data.map((d) => d.year);
    let xmax = d3.max(xarray);
    let xmin = d3.min(xarray);

    let ymax = 0;
    stack_data.forEach((stack) => {
      stack.forEach((sub) => {
        ymax = d3.max([ymax, sub[0], sub[1]]) as number;
      });
    });

    ymax = ymax * y_padding;

    let yScale = d3
      .scaleLinear()
      .range([plot_dimensions.height, 0])
      .domain([0, ymax]);

    let xScale = d3
      .scaleLinear()
      .range([0, plot_dimensions.width])

      .domain([xmin, xmax]);

    let xaxis = d3.axisBottom(xScale).tickFormat((d: number) => d.toString());
    let yaxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat(d3.format(units === "kg_co2_absolute" ? "~s" : ".3"));

    let xaxis_g = bindD3Element(axis_g, "g", "x-axis-g")
      .attr("transform", `translate(${0},${plot_dimensions.height})`)
      .call(xaxis);

    let yaxis_g = bindD3Element(axis_g, "g", "y-axis-g").call(yaxis);

    gridlines_g
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-plot_dimensions.width))
      .style("stroke-dasharray", "2 2");

    gridlines_g.selectAll("line").attr("stroke", "gray");

    gridlines_g.selectAll("text").remove();
    gridlines_g.selectAll(".domain").remove();

    yaxis_g.selectAll("line").remove();
    yaxis_g.selectAll(".domain").remove();
    xaxis_g.selectAll(".domain").remove();

    let stacked_group_g = plot_g
      .selectAll(".stacked-group-g")
      .data(stack_data)
      .join("path")
      .attr("class", "stacked-group-g")
      .attr("d", areaFunc)
      .attr("fill", (d, i) => colorslookup[stack_keys[i]]);

    title_text.text(
      grouping === "category"
        ? `Operational Carbon Over Time By Category, ${case_name}`
        : `Operational Carbon Over Time By Fuel, ${case_name}`
    );
    y_text.text(units === "kg_co2_absolute" ? "kg CO2e/yr" : "kg CO2e/sf/yr");

    /* legend */

    let legend_items = legend_g
      .selectAll(".legend-item-g")
      .data(stack_keys)
      .join("g")
      .attr("class", "legend-item-g");

    legend_items.each(function (d: any, i: number) {
      let row = d3.select(this);
      let legend_text_pad = 30;

      bindD3Element(row, "text", "row-text")
        .attr("x", legend_text_pad)
        .attr("y", () => i * legend_row_padding + legend_row_padding)
        .text(labelslookup[d])
        .style("font-size", "14px");

      bindD3Element(row, "path", "row-rect")
        .attr("d", iconslookup[d])
        .attr(
          "transform",
          () =>
            `translate(0,${
              i * legend_row_padding + legend_row_padding / 2
            }) scale(1)`
        )
        .attr("fill", colorslookup[d])
        .attr("stroke", colorslookup[d]);
    });

    console.log(case_data);
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
  }
};

export { createStackedPlot };
