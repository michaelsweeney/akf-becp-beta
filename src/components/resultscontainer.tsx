import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";

const sidebar_width = "1000px";

const Container = styled("div")`
  display: inline-block;
  width: calc(100% - ${sidebar_width});
  overflow: scroll;
  height: 100%;
`;

const Box = styled("div")`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
`;

const ResultsContainer = () => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  console.log(projection_from_reference_response);
  return (
    <Container>
      {projection_from_reference_response.map((d, i) => (
        <Box key={i}>
          <div>id: {d.case_id}</div>
          <div>
            kg co2 absolute:{" "}
            {d.case_results.emissions_projection[0].kg_co2_absolute}
          </div>
          <div>
            kg co2 per sf:{" "}
            {d.case_results.emissions_projection[0].kg_co2_per_sf}
          </div>
        </Box>
      ))}
    </Container>
  );
};

export default ResultsContainer;
