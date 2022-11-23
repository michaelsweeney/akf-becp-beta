import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import InputListener from "components/inputlistener";
import ResultsContainer from "components/resultscontainer";
import Sidebar from "components/sidebar";
import LoadingSpinner from "components/loadingspinner";
import Header from "components/header";

import { colors } from "components/styles/colors";

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <LoadingSpinner />
      <MainContainer>
        <Header />

        <Sidebar />
        <ResultsContainer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
