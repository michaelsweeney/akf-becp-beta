import "./plotstyles.css";

import { useAppSelector } from "store/hooks";

import SVGWrapper from "./svgwrapper";

import { D3WrapperCallbackPropTypes } from "types";
import { createMultilinePlot } from "./multiline/createmultilineplot";
import { createStackedPlot } from "./stacked/createstackedplot";
import * as d3 from "d3";

import { setupSVGComponents } from "./setupsvgcomponents";

const PlotView = () => {
  const {
    view_options: {
      plot_options: { current_plot_view },
    },
    view_options,
    case_inputs,
    case_outputs,
  } = useAppSelector((state) => state);

  const createSVGLayout = (wprops: D3WrapperCallbackPropTypes) => {
    if (current_plot_view === "multiline") {
      const svg_components = setupSVGComponents(
        wprops.container_dimensions,
        wprops.container_ref,
        "plot-multiline-svg"
      );

      d3.select(wprops.container_ref).selectAll(".plot-stacked-svg").remove();
      createMultilinePlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
        svg_components: svg_components,
      });
    } else if (current_plot_view === "stacked") {
      const svg_components = setupSVGComponents(
        wprops.container_dimensions,
        wprops.container_ref,
        "plot-stacked-svg"
      );
      d3.select(wprops.container_ref).selectAll(".plot-multiline-svg").remove();
      createStackedPlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
        svg_components: svg_components,
      });
    }
  };

  return <SVGWrapper createChartCallback={createSVGLayout} />;
};

export default PlotView;
