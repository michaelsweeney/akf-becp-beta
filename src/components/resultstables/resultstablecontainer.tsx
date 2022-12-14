import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";
import ResultsSelector from "./resultstableselector";
import EnduseContent from "./enduse/endusecontent";
import CarbonContent from "./carbon/carboncontent";

interface MainPropTypes {}
const MainWrapper = styled("div")<MainPropTypes>((props: MainPropTypes) => ({
  padding: "15px",
}));

const ResultsWrapper = styled("div")<{}>(() => ({
  height: "100%",
}));

const ResultsContainer = () => {
  const { current_view } = useAppSelector((state) => state.ui_settings);

  return (
    <MainWrapper>
      <ResultsSelector />
      <ResultsWrapper>
        {current_view === "carbon" ? <CarbonContent /> : <EnduseContent />}
      </ResultsWrapper>
    </MainWrapper>
  );
};

export default ResultsContainer;
