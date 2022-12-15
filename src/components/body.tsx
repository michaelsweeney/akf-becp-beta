import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";

import Header from "components/header";
import Footer from "./footer";
import Drawer from "./drawer/drawer";
import InputForm from "./caseinput/inputform";

import ViewContainer from "./viewcontainer";

const BodyWrapper = styled("div")<{}>(() => ({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  boxSizing: "border-box",
}));

const header_height = 75;
const footer_height = 50;

const BodyMain = styled("div")({
  height: `calc(100% - ${header_height}px - ${footer_height}px)`,
  boxSizing: "border-box",
  overflow: "hidden",
});

const Body = () => {
  const { window_dimensions } = useAppSelector((state) => state.ui_settings);

  return (
    <BodyWrapper>
      <Header height={header_height} />
      <BodyMain>
        <Drawer
          height={window_dimensions.height - header_height - footer_height}
          sidebar_component={<InputForm />}
          main_component={<ViewContainer />}
        />
      </BodyMain>
      <Footer height={footer_height} />
    </BodyWrapper>
  );
};
export default Body;
