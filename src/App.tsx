import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputContainer from "components/inputcontainer";

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputContainer />
    </ThemeProvider>
  );
};

//@ts-ignore
export default App;
