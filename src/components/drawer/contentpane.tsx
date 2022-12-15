import styled from "@mui/styled-engine";
import { useAppSelector } from "store/hooks";

interface MainPropTypes {
  open: boolean;
  sidebarWidth: number;
  sidebarCollapseWidth: number;
}

const MainWrapper = styled("div", {
  label: "content-pane",
})<MainPropTypes>((props: MainPropTypes) => ({
  height: "100%",
  marginLeft: !props.open
    ? `${props.sidebarCollapseWidth}px`
    : `${props.sidebarWidth}px`,
  transition: "margin 250ms",
  overflowY: "auto",
  boxSizing: "border-box",
}));

type ContentPaneTypes = {
  component: JSX.Element | JSX.Element[];
};
const ContentPane = (props: ContentPaneTypes) => {
  const { component } = props;

  const { sidebar_open, sidebar_width, sidebar_collapse_width } =
    useAppSelector((state) => state.ui_settings);

  return (
    <MainWrapper
      className="drawer-content-pane"
      open={sidebar_open}
      sidebarWidth={sidebar_width}
      sidebarCollapseWidth={sidebar_collapse_width}
    >
      {component}
    </MainWrapper>
  );
};

export default ContentPane;
