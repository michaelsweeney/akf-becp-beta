import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "styles/colors";

import InputListener from "components/inputlistener";
import LoadingSpinner from "components/loadingspinner";
import Body from "components/body";

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
      <Body />
    </ThemeProvider>
  );
};

export default App;
