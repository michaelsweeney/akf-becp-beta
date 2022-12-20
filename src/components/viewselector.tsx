import { ViewTypes } from "types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { viewActions } from "store/viewoptionslice";
import OptionToggle from "./optiontoggle";

const ViewSelector = () => {
  const { current_view } = useAppSelector((state) => state.view_options);

  const dispatch = useAppDispatch();
  const handleSetCurrentView = (d: ViewTypes) => {
    dispatch(viewActions.setCurrentView(d));
  };

  return (
    <OptionToggle
      title="view type"
      buttons={[
        { key: "plot", label: "plot" },
        { key: "table", label: "table" },
      ]}
      callback={(d) => handleSetCurrentView(d as ViewTypes)}
      current_key={current_view}
    />
  );
};

export default ViewSelector;
