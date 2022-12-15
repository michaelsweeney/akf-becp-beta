import TableView from "./resultstables/tableview";
import PlotView from "./resultsplots/plotview";

import { useAppSelector, useAppDispatch } from "store/hooks";

import OptionToggle from "components/optiontoggle";
import { ViewTypes } from "types";
import { uiActions } from "store/uislice";
import styled from "@mui/styled-engine";

const OptionWrapper = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const ViewWrapper = styled("div")({
  padding: "15px",
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
    <ViewWrapper>
      <OptionWrapper>
        <OptionToggle
          title="view type"
          buttons={[
            { key: "plot", label: "plot" },
            { key: "table", label: "table" },
          ]}
          callback={(d) => handleSetCurrentView(d as ViewTypes)}
          current_key={current_view}
        />
      </OptionWrapper>

      {CurrentComponent}
    </ViewWrapper>
  );
};

export default ViewContainer;
