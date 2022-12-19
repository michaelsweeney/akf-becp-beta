import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import ResultsSelector from "./tableselector";
import EnduseTableContent from "./enduse/endusecontent";
import CarbonTableContent from "./carbon/carboncontent";

const ResultsWrapper = styled("div")<{}>(() => ({
  height: "100%",
}));

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

  return (
    <>
      <ResultsSelector />
      <ResultsWrapper>{CurrentComponent}</ResultsWrapper>
    </>
  );
};

export default TableView;
