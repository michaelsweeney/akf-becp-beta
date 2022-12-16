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
    plot_options: { current_plot_view },
  } = useAppSelector((state) => state.ui_settings);

  const createSVGLayout = (wprops: D3WrapperCallbackPropTypes) => {
    if (current_plot_view === "multiline") {
      createMultilinePlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
      });
    } else if (current_plot_view === "stacked") {
      createStackedPlot({
        container_dimensions: wprops.container_dimensions,
        container_ref: wprops.container_ref,
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
