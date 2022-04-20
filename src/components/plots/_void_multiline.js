import * as d3 from "d3";

import { HeatPumpIconPath, ElectricityIconPath, GasIconPath } from "./svgicons";
import { getIdealSpacing } from "./spacing";
export const createMultiLineChart = (config) => {
  let {
    chartdims,
    margins,
    svg,
    title_g,
    xaxis_g,
    yaxis_g,
    plot_g,
    rightborder_g,
    topborder_g,
    annotation_g,
    legend_g,
    case_results,
    plot_config,
    hover_g,
    berdo_thresholds,
    ll97_thresholds,
    xScale,
    yScale,
    emissions_projections,
  } = config;

  let colorScale = d3.schemeTableau10;

  let transition_duration = 500;

  let multiline_legend_icon_svg = [
    HeatPumpIconPath,
    ElectricityIconPath,
    GasIconPath,
  ];
  let legend_padding_top = 50;

  let berdo_color = "black";
  let ll97_color = "black";

  let multiline_g = plot_g
    .selectAll(".multiline-g")
    .data([0])
    .join("g")
    .attr("class", "multiline-g");

  let multiline_ll97_g = plot_g
    .selectAll(".ll97-g")
    .data([0])
    .join("g")
    .attr("class", "ll97-g");

  let multiline_berdo_g = plot_g
    .selectAll(".berdo-g")
    .data([0])
    .join("g")
    .attr("class", "berdo-g");

  let xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickFormat(d3.format("d"))
    .tickSizeOuter(0);
  let yAxis = d3.axisLeft().scale(yScale).ticks(5).tickSizeOuter(0);

  xaxis_g.transition().duration(transition_duration).call(xAxis);
  yaxis_g.transition().duration(transition_duration).call(yAxis);

  rightborder_g.call(d3.axisRight().scale(yScale).ticks(0).tickSizeOuter(0));

  topborder_g.call(d3.axisTop().scale(xScale).ticks(0).tickSizeOuter(0));

  let lineGen = d3
    .line()
    .x((d) => xScale(d["year"]))
    .y((d) => yScale(d["kg_co2_per_sf"]));

  multiline_g
    .selectAll(".data-line")
    .data(emissions_projections)
    .join("path")
    .attr("class", "data-line")
    .transition()
    .duration(transition_duration)
    .attr("d", lineGen)
    .attr("fill", "none")
    .attr("stroke", (d, i) => colorScale[i])
    .attr("stroke-width", 3);

  multiline_berdo_g
    .selectAll(".berdo-threshold-circle")
    .data(berdo_thresholds[0])
    .join("circle")
    .attr("class", "berdo-threshold-circle")
    .attr("cx", (d) => xScale(d["period"].split("-")[0]))
    .attr("cy", (d) => yScale(d["val"]))
    .attr("r", 5)
    .attr("fill", d3.color(berdo_color).brighter(0.5))
    .attr("stroke", berdo_color);

  multiline_berdo_g
    .selectAll(".berdo-threshold-line")
    .data(berdo_thresholds[0])
    .join("line")
    .attr("class", "berdo-threshold-line")
    .attr("x1", (d) => xScale(d["period"].split("-")[0]) + 8)
    .attr("x2", (d) => xScale(2050))
    .attr("y1", (d) => yScale(d["val"]))
    .attr("y2", (d) => yScale(d["val"]))
    .attr("fill", berdo_color)
    .attr("stroke", berdo_color)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 4);

  multiline_ll97_g
    .selectAll(".ll97-threshold-circle")
    .data(ll97_thresholds[0])
    .join("circle")
    .attr("class", "ll97-threshold-circle")
    .attr("cx", (d) => xScale(d["period"].split("-")[0]))
    .attr("cy", (d) => yScale(d["val"]))
    .attr("r", 4)
    .attr("fill", ll97_color);

  multiline_ll97_g
    .selectAll(".ll97-threshold-line")
    .data(ll97_thresholds[0])
    .join("line")
    .attr("class", "ll97-threshold-line")
    .attr("x1", (d) => xScale(d["period"].split("-")[0]))
    .attr("x2", (d) => xScale(2050))
    .attr("y1", (d) => yScale(d["val"]))
    .attr("y2", (d) => yScale(d["val"]))
    .attr("fill", ll97_color)
    .attr("stroke", ll97_color)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 4);

  let multiline_legend_g = legend_g
    .selectAll(".multiline-legend-g")
    .data([0])
    .join("g")
    .attr("class", "multiline-legend-g")
    .attr("transform", `translate(0, ${legend_padding_top})`);

  let multiline_legend_icons = multiline_legend_g
    .selectAll(".multiline-legend-icon-g")
    .data(multiline_legend_icon_svg)
    .join("path")
    .attr("class", "multiline-legend-icon-g")
    .attr(
      "transform",
      (d, i) => `translate(0, ${i * 30 - 15}) scale(1.25 1.25)`
    )
    .attr("d", (d) => d)
    .attr("fill", (d, i) => colorScale[i]);

  let multiline_legend_case_text = multiline_legend_g
    .selectAll(".multiline-legend-case-text")
    .data(case_results)
    .join("text")
    .attr("x", 40)
    .attr("y", (d, i) => 30 * i + 5)
    .attr("class", "multiline-legend-case-text")
    .text((d) => d.case_name);

  let multiline_icon_annotation_values = emissions_projections.map(
    (d) => d.filter((e) => e.year == "2050")[0]["kg_co2_per_sf"]
  );

  let multiline_icon_annotation_positions =
    multiline_icon_annotation_values.map((d) => yScale(d));

  let spaced_multiline_icon_annotation_positions = getIdealSpacing(
    multiline_icon_annotation_positions,
    30
  );

  let multiline_icon_annotations = annotation_g
    .selectAll(".multiline-icon-annotation")
    .data(spaced_multiline_icon_annotation_positions)
    .join("path")
    .attr("class", "multiline-icon-annotation")
    .attr("d", (d, i) => multiline_legend_icon_svg[i])
    .attr("fill", (d, i) => colorScale[i])
    .transition()
    .duration(transition_duration)
    .attr("transform", (d, i) => {
      return `translate(${chartdims.width + margins.l + 15}, ${
        margins.t + d - 10
      }) scale(1.25 1.25)`;
    });

  title_g
    .selectAll(".chart-title-text")
    .data([0])
    .join("text")
    .attr("class", "chart-title-text")
    .attr(
      "transform",
      `translate(${margins.l + chartdims.width / 2},${margins.t / 2})`
    )
    .attr("text-anchor", "middle")
    .text("Carbon Intensity over Time")
    .style("font-weight", 600);

  title_g
    .selectAll(".x-axis-title-g")
    .data([0])
    .join("text")
    .attr("class", "x-axis-title-g")
    .attr(
      "transform",
      `translate(${margins.l / 2},${
        margins.t + chartdims.height / 2
      })rotate(-90)`
    )
    .attr("text-anchor", "middle")
    .text("Carbon Intensity (kg/sf/yr)")
    .style("font-weight", 600);

  /* -- HOVER EVENTS -- */

  // hacky flatten for hover circles

  let emissions_projections_flat = [
    ...emissions_projections[0].map((d) => {
      return {
        ...d,
        case_name: case_results[0].case_name,
        nameidx: 0,
      };
    }),
    ...emissions_projections[1].map((d) => {
      return {
        ...d,
        case_name: case_results[1].case_name,
        nameidx: 1,
      };
    }),
    ...emissions_projections[2].map((d) => {
      return {
        ...d,
        case_name: case_results[2].case_name,
        nameidx: 2,
      };
    }),
  ];

  let hover_line = hover_g
    .selectAll(".hover-line")
    .data([0])
    .join("line")
    .attr("class", "hover-line")
    .attr("x1", xScale(2040))
    .attr("x2", xScale(2040))
    .attr("y1", yScale(yScale.domain()[0]))
    .attr("y2", yScale(yScale.domain()[1]))
    .attr("fill", "red")
    .attr("stroke-width", 2)
    .attr("stroke", "black")
    .attr("stroke-dasharray", 2)
    .attr("opacity", 0);

  let hover_circles = hover_g
    .selectAll(".hover-circle")
    .data(emissions_projections_flat)
    .join("circle")
    .attr("class", "hover-circle")
    .attr("r", 4)
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.kg_co2_per_sf))
    .attr("fill", (d, i) => colorScale[d.nameidx])
    .attr("opacity", 0);

  let rect_width = 325;
  let rect_height = 125;

  let hover_info_g = hover_g
    .selectAll(".hover-info-g")
    .data([0])
    .join("g")
    .attr("class", "hover-info-g")
    .attr("opacity", 0);

  let hover_info_rect = hover_info_g
    .selectAll(".hover-info-rect")
    .data([0])
    .join("rect")
    .attr("class", "hover-info-rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", rect_height)
    .attr("width", rect_width)
    .attr("fill", "gray")
    .attr("opacity", 0.9)
    .attr("rx", 0);

  let hover_info_year_text = hover_info_g
    .selectAll(".hover-info-year-text")
    .data([0])
    .join("text")
    .attr("class", "hover-info-year-text")
    .attr("x", 15)
    .attr("y", 30)
    .html("")
    .attr("font-weight", 700)
    .attr("fill", "white");

  let hover_info_text = hover_info_g
    .selectAll(".hover-info-text")
    .data(emissions_projections)
    .join("text")
    .attr("class", "hover-info-text")
    .attr("x", 15)
    .attr("y", (d, i) => i * 20 + 60)
    .html("")
    .attr("fill", "white");

  // this needs to be the last item appended
  let hover_rect = hover_g
    .selectAll(".hover-rect")
    .data([0])
    .join("rect")
    .attr("class", "hover-rect")
    .attr("width", chartdims.width)
    .attr("height", chartdims.height)
    .attr("opacity", 0);

  hover_rect.on("mousemove", function (e) {
    let mouse = d3.pointer(e);
    let mouseX = mouse[0];
    let mouseY = mouse[1];
    let xval = xScale.invert(mouseX);

    let years = emissions_projections[0].map((d) => d.year);
    let xval_bisect = d3.bisectLeft(years, xval);
    let selected_year = years[xval_bisect];

    hover_line
      .attr("opacity", 1)
      .attr("x1", xScale(selected_year))
      .attr("x2", xScale(selected_year));

    hover_info_g.attr("opacity", 1).attr(
      "transform",
      `translate(
        ${mouseX - (mouseX / chartdims.width) * rect_width}
        ,
        ${mouseY - rect_height - 10})`
    );

    hover_circles.attr("opacity", (d) => (d.year == selected_year ? 1 : 0));

    hover_info_year_text.text(selected_year);
    hover_info_text.text((d, i) => {
      let year = selected_year;
      let simname = case_results[i].case_name;
      let val = d3.format(".2f")(
        d.filter((a) => a.year === year)[0]["kg_co2_per_sf"]
      );
      return `${simname}: ${val} kg/sf/yr`;
    });
  });

  svg.on("mouseleave", function (e) {
    hover_line.attr("opacity", 0);
    hover_info_g.attr("opacity", 0);
  });

  return {
    multiline_g,
    multiline_ll97_g,
    multiline_berdo_g,
    multiline_legend_g,
  };
};
