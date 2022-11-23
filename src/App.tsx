import { createTheme, ThemeProvider } from "@mui/material/styles";

import { styled } from "@mui/system";
import InputListener from "components/inputlistener";
import ResultsContainer from "components/resultscontainer";
import Sidebar from "components/sidebar";
import LoadingSpinner from "components/loadingspinner";

import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { uiActions } from "store/uislice";
import { colors } from "components/styles/colors";
import "App.css";
import { arrow_forward, IconSvg } from "components/svgicons";

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.secondary,
    },
    primary: {
      main: colors.primary,
    },
  },
});

const MainContainer = styled("div")<{}>(() => ({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
}));

const Header = styled("div")<{}>(() => ({}));

const App = () => {
  const dispatch = useAppDispatch();
  const { sidebar_open } = useAppSelector((state) => state.ui_settings);

  const toggleSidebar = () => {
    dispatch(uiActions.setSidebarOpen(!sidebar_open));
  };

  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <LoadingSpinner />
      <MainContainer>
        <Header>
          <Button onClick={toggleSidebar}>
            <IconSvg fill={colors.primary} d={arrow_forward} />
          </Button>
        </Header>

        <Sidebar />
        <ResultsContainer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
