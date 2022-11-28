import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { colors } from "styles/colors";

import InputListener from "components/inputlistener";
import LoadingSpinner from "components/loadingspinner";
import MainContainer from "components/maincontainer";

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <LoadingSpinner />
      <MainContainer />
    </ThemeProvider>
  );
};

export default App;
