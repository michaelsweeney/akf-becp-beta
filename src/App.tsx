import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputForm from "components/inputform";

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
      <InputForm />
    </ThemeProvider>
  );
};

export default App;
