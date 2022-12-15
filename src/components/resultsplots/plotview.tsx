import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import PlotSelector from "./plotselector";

import MultilinePlot from "./multiline/multilineplot";
import StackedPlot from "./stacked/stackedplot";

const ResultsWrapper = styled("div")<{}>(() => ({
  height: "100%",
}));

const PlotView = () => {
  const {
    plot_options: { current_plot_view },
  } = useAppSelector((state) => state.ui_settings);

  // switch statement for current view...

  const getCurrentComponent = () => {
    switch (current_plot_view) {
      case "multiline":
        return <MultilinePlot />;
      case "stacked":
        return <StackedPlot />;
      default:
        return <MultilinePlot />;
    }
  };

  const CurrentComponent = getCurrentComponent();

  return (
    <div>
      <PlotSelector />
      <ResultsWrapper>{CurrentComponent}</ResultsWrapper>
    </div>
  );
};

export default PlotView;
