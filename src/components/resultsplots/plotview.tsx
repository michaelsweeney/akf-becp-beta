import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import PlotTypeSelector from "./plottypeselector";

import MultilineControls from "./multiline/multilinecontrols";
import StackedControls from "./stacked/stackedcontrols";
import SVGWrapper from "./svgwrapper";

import { D3WrapperCallbackPropTypes } from "types";
import { createMultilinePlot } from "./multiline/createmultilineplot";
import { createStackedPlot } from "./stacked/createstackedplot";

const PlotViewWrapper = styled("div", { label: "plot-view" })({});

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
      createMultilinePlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
      });
    } else if (current_plot_view === "stacked") {
      createStackedPlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
        case_outputs: case_outputs,
        case_inputs: case_inputs,
        view_options: view_options,
      });
    }
  };

  const getCurrentControlsComponent = () => {
    switch (current_plot_view) {
      case "multiline":
        return <MultilineControls />;
      case "stacked":
        return <StackedControls />;
      default:
        return <MultilineControls />;
    }
  };

  const ControlsComponent = getCurrentControlsComponent();

  return (
    <PlotViewWrapper>
      <PlotTypeSelector />

      <SVGWrapper createChartCallback={createSVGLayout} />
      {ControlsComponent}
    </PlotViewWrapper>
  );
};

export default PlotView;
