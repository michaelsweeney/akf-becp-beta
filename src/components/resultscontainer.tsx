import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";

const sidebar_width = "750px";

interface MainPropTypes {
  open: boolean;
  sidebarWidth: number;
}
const Main = styled("div")<MainPropTypes>(({ open, sidebarWidth }) => ({
  backgroundColor: open ? "palevioletred" : "yellow",
  color: open ? "white" : "palevioletred",
  height: "100%",
  marginLeft: sidebarWidth,
  transition: "margin 250ms",
}));

const ResultsBox = styled("div")<{}>(() => ({
  margin: "10px",
  padding: "10px",
  border: "1px solid black",
}));

const ResultsContainer = () => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  const { sidebar_open, sidebar_width } = useAppSelector(
    (state) => state.ui_settings
  );

  return (
    <Main open={sidebar_open} sidebarWidth={sidebar_width}>
      {projection_from_reference_response.map((d, i) => (
        <ResultsBox key={i}>
          <div>id: {d.case_id}</div>
          <div>
            kg co2 absolute:{" "}
            {d.case_results.emissions_projection[0].kg_co2_absolute}
          </div>
          <div>
            kg co2 per sf:{" "}
            {d.case_results.emissions_projection[0].kg_co2_per_sf}
          </div>
        </ResultsBox>
      ))}
    </Main>
  );
};

export default ResultsContainer;
