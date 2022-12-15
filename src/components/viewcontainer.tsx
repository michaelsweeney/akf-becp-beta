import TableView from "./resultstables/tableview";
import PlotView from "./resultsplots/plotview";

import { useAppSelector, useAppDispatch } from "store/hooks";

import OptionToggle from "components/optiontoggle";
import { ViewTypes } from "types";
import { uiActions } from "store/uislice";
import styled from "@mui/styled-engine";

const OptionWrapper = styled("div", { label: "option-wrapper" })({
  display: "inline-block",
  width: "100%",
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const ViewWrapper = styled("div", { label: "view-wrapper" })({
  display: "inline-block",
  height: "100%",
  width: "100%",
  padding: "15px",
  boxSizing: "border-box",
});

const ComponentWrapper = styled("div", { label: "component-wrapper" })({
  display: "inline-block",
  // height: "100%",
  width: "100%",
});

const ViewContainer = () => {
  const { current_view } = useAppSelector((state) => state.ui_settings);
  const dispatch = useAppDispatch();

  const getCurrentComponent = () => {
    switch (current_view) {
      case "plot":
        return <PlotView />;

      case "table":
        return <TableView />;
    }
  };

  const handleSetCurrentView = (d: ViewTypes) => {
    dispatch(uiActions.setCurrentView(d));
  };

  const CurrentComponent = getCurrentComponent();
  return (
    <ViewWrapper className="view-container">
      <OptionWrapper className="view-options-container">
        <OptionToggle
          title="view type"
          buttons={[
            { key: "plot", label: "plot" },
            { key: "table", label: "table" },
          ]}
          callback={(d) => handleSetCurrentView(d as ViewTypes)}
          current_key={current_view}
        />
        <div></div>
      </OptionWrapper>
      <ComponentWrapper>{CurrentComponent}</ComponentWrapper>
    </ViewWrapper>
  );
};

export default ViewContainer;
