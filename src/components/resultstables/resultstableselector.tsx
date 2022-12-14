import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";
import { CurrentViewTypes } from "types";

import * as S from "styling/components";
import OptionToggle from "components/optiontoggle";

interface PropTypes {}

const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const ViewSelector = (props: PropTypes) => {
  const dispatch = useAppDispatch();

  const { current_view } = useAppSelector((state) => state.ui_settings);
  const handleSetCurrentView = (vtype: CurrentViewTypes) => {
    dispatch(uiActions.setCurrentView(vtype));
  };

  return (
    <Root>
      <OptionToggle
        title="table view"
        buttons={[
          { key: "carbon", label: "carbon" },
          { key: "enduse", label: "enduse" },
        ]}
        callback={(d) => handleSetCurrentView(d as CurrentViewTypes)}
        current_key={current_view}
      />
    </Root>
  );
};
export default ViewSelector;
