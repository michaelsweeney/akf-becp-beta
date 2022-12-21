import TableView from "./resultstables/tableview";
import PlotView from "./resultsplots/plotview";

import { useAppSelector } from "store/hooks";

import ViewSelector from "./viewselector";

import styled from "@mui/styled-engine";
import PlotTypeSelector from "./resultsplots/plottypeselector";
import TableSelector from "./resultstables/tableselector";
import MultilineControls from "./resultsplots/multiline/multilinecontrols";
import StackedControls from "./resultsplots/stacked/stackedcontrols";
import CarbonTableControls from "./resultstables/carbon/carbontablecontrols";
import EnduseTableControls from "./resultstables/enduse/endusetablecontrols";

const option_pane_height = "82px";

const ViewWrapper = styled("div")({
  display: "inline-block",
  height: "100%",
  width: "100%",
  boxSizing: "border-box",
});

const TopOptionPane = styled("div")({
  display: "inline-block",
  width: "100%",
  padding: "15px",
  borderBottom: "1px solid black",
  boxSizing: "border-box",
  height: option_pane_height,
});

const ComponentWrapper = styled("div")({
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box",
  height: `calc(100% - ${option_pane_height} - ${option_pane_height})`,
  overflow: "hidden",
  overflowY: "auto",
});

const BottomOptionPane = styled("div")({
  display: "inline-block",
  width: "100%",
  padding: "15px",
  borderTop: "1px solid black",
  boxSizing: "border-box",
  height: option_pane_height,
});

const ViewContainer = () => {
  const {
    current_view,
    plot_options: { current_plot_view },
    table_options: { current_table_view },
  } = useAppSelector((state) => state.view_options);

  const getCurrentComponent = () => {
    switch (current_view) {
      case "plot":
        return <PlotView />;

      case "table":
        return <TableView />;
    }
  };

  const getTopOptionPaneComponent = () => {
    switch (current_view) {
      case "plot":
        return <PlotTypeSelector />;

      case "table":
        return <TableSelector />;
    }
  };

  const getBottomOptionPaneComponent = () => {
    switch (current_view) {
      case "plot":
        switch (current_plot_view) {
          case "multiline":
            return <MultilineControls />;
          case "stacked":
            return <StackedControls />;
          default:
            return <div />;
        }

      case "table":
        switch (current_table_view) {
          case "carbon":
            return <CarbonTableControls />;
          case "enduse":
            return <EnduseTableControls />;
          default:
            return <div />;
        }
    }
  };
  const TopOptionPaneComponent = getTopOptionPaneComponent();
  const CurrentComponent = getCurrentComponent();
  const BottomOptionComponent = getBottomOptionPaneComponent();

  return (
    <ViewWrapper className="view-container">
      <TopOptionPane className="top-options-container">
        <ViewSelector />
        {TopOptionPaneComponent}
      </TopOptionPane>
      <ComponentWrapper className="center-view-container">
        {CurrentComponent}
      </ComponentWrapper>
      <BottomOptionPane className="bottom-options-container">
        {BottomOptionComponent}
      </BottomOptionPane>
    </ViewWrapper>
  );
};

export default ViewContainer;
