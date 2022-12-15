import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import { D3WrapperCallbackPropTypes } from "types";
import PlotSelector from "./plotselector";

import SVGWrapper from "./svgwrapper";

import { createStackedPlot } from "./stacked/createstackedplot";
import { createMultilinePlot } from "./multiline/createmultilineplot";

const PlotViewWrapper = styled("div", { label: "plot-view" })({});

const PlotView = () => {
  const {
    plot_options: { current_plot_view },
  } = useAppSelector((state) => state.ui_settings);

  const createLayout = (config: D3WrapperCallbackPropTypes) => {
    const { container_dimensions, container_ref } = config;

    if (current_plot_view === "multiline") {
      createMultilinePlot({ container_dimensions, container_ref });
    }
    if (current_plot_view === "stacked") {
      createStackedPlot({ container_dimensions, container_ref });
    }
    // console.log(container_dimensions, container_ref);
  };

  return (
    <PlotViewWrapper>
      <PlotSelector />
      <SVGWrapper createChartCallback={createLayout} />
    </PlotViewWrapper>
  );
};

export default PlotView;
