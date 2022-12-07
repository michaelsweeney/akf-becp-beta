import styled from "@mui/styled-engine";

import Header from "components/header";
import { useAppSelector } from "store/hooks";

import Drawer from "./drawer/drawer";
import InputForm from "./inputform";

import ResultsContainer from "./resultscontainer";

const BodyWrapper = styled("div")<{}>(() => ({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  boxSizing: "border-box",
}));

const header_height = 75;

const BodyMain = styled("div")({
  height: `calc(100% - ${header_height}px)`,
});

const Body = () => {
  const { window_dimensions, current_view } = useAppSelector(
    (state) => state.ui_settings
  );

  return (
    <BodyWrapper>
      <Header height={header_height} />
      <BodyMain>
        <Drawer
          height={window_dimensions.height - header_height}
          sidebar_component={<InputForm />}
          main_component={<ResultsContainer />}
        />
      </BodyMain>
    </BodyWrapper>
  );
};
export default Body;
