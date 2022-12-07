import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import ResultsSelector from "./resultsselector";
import EnduseTable from "./resultstables/endusetable";
import CarbonTable from "./resultstables/carbontable";

interface MainPropTypes {}
const MainWrapper = styled("div")<MainPropTypes>(
  (props: MainPropTypes) => ({})
);

const ResultsWrapper = styled("div")<{}>(() => ({
  height: "100%",
}));

const ResultsContainer = () => {
  const { current_view } = useAppSelector((state) => state.ui_settings);

  return (
    <MainWrapper>
      <ResultsSelector />
      <ResultsWrapper>
        {current_view === "carbon" ? <CarbonTable /> : <EnduseTable />}
      </ResultsWrapper>
    </MainWrapper>
  );
};

export default ResultsContainer;
