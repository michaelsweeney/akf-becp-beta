import { useAppSelector } from "store/hooks";

import EnduseTableContent from "./enduse/endusecontent";
import CarbonTableContent from "./carbon/carboncontent";

import styled from "@mui/styled-engine";
const TableViewWrapper = styled("div")({
  padding: "15px",
});

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

  return <TableViewWrapper>{CurrentComponent}</TableViewWrapper>;
};

export default TableView;
