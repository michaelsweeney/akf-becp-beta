import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";

import MultilineControls from "./multiline/multilinecontrols";
import StackedControls from "./stacked/stackedcontrols";
import SVGWrapper from "./svgwrapper";

import { D3WrapperCallbackPropTypes } from "types";
import { createMultilinePlot } from "./multiline/createmultilineplot";
import { createStackedPlot } from "./stacked/createstackedplot";
import * as d3 from "d3";

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
      d3.select(wprops.container_ref).selectAll(".plot-stacked-svg").remove();
      createMultilinePlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
      });
    } else if (current_plot_view === "stacked") {
      d3.select(wprops.container_ref).selectAll(".plot-multiline-svg").remove();
      createStackedPlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
      });
    }
  };

  return <SVGWrapper createChartCallback={createSVGLayout} />;
};

export default PlotView;
