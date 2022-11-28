import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import ResultsSelector from "./resultsselector";
import EnduseTable from "./resultstables/endusetable";
import CarbonTable from "./resultstables/carbontable";

interface MainPropTypes {
  open: boolean;
  sidebarWidth: number;
}
const Main = styled("div")<MainPropTypes>(({ open, sidebarWidth }) => ({
  height: "100%",
  marginLeft: sidebarWidth,
  transition: "margin 250ms",
}));

const ResultsWrapper = styled("div")<{}>(() => ({
  height: "100%",
}));

const ResultsContainer = () => {
  const { sidebar_open, sidebar_width, current_view } = useAppSelector(
    (state) => state.ui_settings
  );

  return (
    <Main open={sidebar_open} sidebarWidth={sidebar_width}>
      <ResultsSelector />
      <ResultsWrapper>
        {current_view === "carbon" ? <CarbonTable /> : <EnduseTable />}
      </ResultsWrapper>
    </Main>
  );
};

export default ResultsContainer;
