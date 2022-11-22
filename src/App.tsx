import { createTheme, ThemeProvider } from "@mui/material/styles";

import { styled } from "@mui/system";
import InputListener from "components/inputlistener";
import ResultsContainer from "components/resultscontainer";
import Sidebar from "components/sidebar";
import LoadingSpinner from "components/loadingspinner";

import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { uiActions } from "store/uislice";

import "App.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#cf202e",
    },
    primary: {
      main: "#283759",
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
          <Button onClick={toggleSidebar}>open</Button>
        </Header>

        <Sidebar />
        <ResultsContainer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
