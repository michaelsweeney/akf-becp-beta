import styled from "@mui/styled-engine";

import ResultsContainer from "./resultscontainer";
import Sidebar from "components/sidebar";
import Header from "components/header";

const Body = styled("div")<{}>(() => ({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
}));

const MainContainer = () => {
  return (
    <Body>
      <Header />
      <Sidebar />
      <ResultsContainer />
    </Body>
  );
};
export default MainContainer;
