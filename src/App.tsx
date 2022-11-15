import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputForm from "components/inputform";
import { styled } from "@mui/system";

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

const sidebar_width = "1000px";

const Body = styled("div")`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled("div")`
  display: inline-block;
  height: 100%;
  width: ${sidebar_width};
  overflow: scroll;
`;

const ResultsContainer = styled("div")`
  display: inline-block;
  width: calc(100% - ${sidebar_width});
  overflow: scroll;
  height: 100%;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Body>
        <Sidebar>
          <InputForm />
        </Sidebar>
        <ResultsContainer>jfklds</ResultsContainer>
      </Body>
    </ThemeProvider>
  );
};

export default App;
