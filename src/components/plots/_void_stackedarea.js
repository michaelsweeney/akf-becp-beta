import * as d3 from "d3";

export const createStackedAreaChart = (config) => {
  let {
    chartdims,
    svg,
    title_g,
    xaxis_g,
    yaxis_g,
    plot_g,
    rightborder_g,
    topborder_g,
    annotation_g,
    legend_g,
    margins,
    plot_config,
    emissions_projections_by_fuel,
    xScale,
    yScale,
  } = config;

  let fuel_colors = {
    Electricity: "#1F77B4FF",
    "Natural Gas": "#FF7F0EFF",
  };
  let legend_padding_top = 50;

  let stacked_area_g = plot_g
    .selectAll(".stacked-area-g")
    .data([0])
    .join("g")
    .attr("class", "stacked-area-g");

  let data = emissions_projections_by_fuel[stackedAreaIndex].map((d) => {
    return {
      fuel: d.fuel,
      year: d.year,
      kg_co2_per_sf: d.kg_co2_per_sf,
    };
  });

  // --- AREA PLOT THRESHOLDS
  // template source: https://www.d3-graph-gallery.com/graph/stackedarea_template.html

  let years = [...new Set(data.map((d) => d.year))];
  let fuel_types = [...new Set(data.map((d) => d.fuel))];
  if (fuel_types.length > 1) {
    fuel_types = [fuel_types[1], fuel_types[0]]; // << reverse order, manual for gas / elec only.s
  }

  let prestacked_data = [];
  years.forEach((year, i) => {
    let year_obj = {};

    year_obj["year"] = year;

    fuel_types.forEach((fuel) => {
      year_obj[fuel] = data.filter((d) => {
        return d.fuel == fuel && d.year == year;
      })[0]["kg_co2_per_sf"];
    });
    prestacked_data.push(year_obj);
  });

  let stackedData = d3.stack().keys(fuel_types)(prestacked_data);

  // Area generator
  let areaGen = d3
    .area()
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  stacked_area_g.selectAll(".areas").remove();

  stacked_area_g
    .selectAll(".areas")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", "areas")
    .style("fill", (d) => fuel_colors[d.key])
    .attr("d", areaGen);

  let stacked_legend_g = legend_g
    .selectAll(".stacked-legend-g")
    .data([0])
    .join("g")
    .attr("class", "stacked-legend-g")
    .attr("transform", `translate(0, ${legend_padding_top})`);

  let stacked_legend_case_rects = stacked_legend_g
    .selectAll(".stacked-legend-case-rect")
    .data(fuel_types)
    .join("rect")
    .attr("class", "stacked-legend-case-rect")
    .attr("width", 25)
    .attr("height", 25)
    .attr("x", 0)
    .attr("y", (d, i) => 30 * i)
    .attr("fill", (d, i) => fuel_colors[d]);

  let stacked_legend_case_text = stacked_legend_g
    .selectAll(".stacked-legend-case-text")
    .data(fuel_types)
    .join("text")
    .attr("x", 40)
    .attr("y", (d, i) => 30 * i + 20)
    .attr("class", "stacked-legend-case-text")
    .text((d) => d);
  return {
    stacked_area_g,
    stacked_legend_g,
  };
};
