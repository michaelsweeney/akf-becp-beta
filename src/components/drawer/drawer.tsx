import Sidebar from "./sidebar";
import SidebarCollapse from "./sidebarcollapse";
import ContentPane from "./contentpane";

interface PropTypes {
  height: number;
  sidebar_component: JSX.Element | JSX.Element[];
  main_component: JSX.Element | JSX.Element[];
}

const Drawer = (props: PropTypes) => {
  const { height, sidebar_component, main_component } = props;

  return (
    <>
      <Sidebar height={height} component={sidebar_component} />
      <SidebarCollapse height={height} />
      <ContentPane component={main_component} />
    </>
  );
};

export default Drawer;
