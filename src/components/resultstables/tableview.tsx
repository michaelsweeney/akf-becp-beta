import { useAppSelector } from "store/hooks";

import EnduseTableContent from "./enduse/endusecontent";
import CarbonTableContent from "./carbon/carboncontent";

const TableView = () => {
  const {
    table_options: { current_table_view },
  } = useAppSelector((state) => state.view_options);

  const getCurrentComponent = () => {
    switch (current_table_view) {
      case "carbon":
        return <CarbonTableContent />;
      case "enduse":
        return <EnduseTableContent />;
      default:
        return <CarbonTableContent />;
    }
  };

  const CurrentComponent = getCurrentComponent();

  return <>{CurrentComponent}</>;
};

export default TableView;
