import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";
import { PlotViewTypes } from "types";

import OptionToggle from "components/optiontoggle";

interface PropTypes {}

const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const ResultsPlotSelector = (props: PropTypes) => {
  const dispatch = useAppDispatch();

  const { current_plot_view } = useAppSelector(
    (state) => state.ui_settings.plot_options
  );
  const handleSetCurrentTableView = (vtype: PlotViewTypes) => {
    dispatch(uiActions.setCurrentPlotView(vtype));
  };

  return (
    <Root>
      <OptionToggle
        title="plot type"
        buttons={[
          { key: "multiline", label: "multiline" },
          { key: "stacked", label: "stacked" },
        ]}
        callback={(d) => handleSetCurrentTableView(d as PlotViewTypes)}
        current_key={current_plot_view}
      />
    </Root>
  );
};
export default ResultsPlotSelector;
