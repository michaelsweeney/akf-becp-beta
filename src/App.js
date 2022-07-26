import React, { useEffect, useState } from "react";
import "./App.css";
import { conn } from "./store/connect";

import { makeStyles } from "@material-ui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as api from "./apicalls";

// import PlotContainer from "./components/plots/plotcontainer";
// import CaseControls from "./components/casecontrols";
// import GlobalControls from "./components/globalcontrols";
// import { LoadingSpinner } from "./components/loadingspinner";
// import { LoadingScreenError } from "./components/loadingerrorscreen";
// import { Header } from "./components/header";
// import ResultsTable from "./components/resultstable";

import InputContainer from "./components/inputcontainer";

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

const useStyles = makeStyles({
  root: {
    width: "calc(100vw)",
    height: "calc(100vh)",
    boxSizing: "border-box",
  },
  main: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: 10,
  },
  header: {
    display: "block",
    width: "100%",
    height: "75px",
    boxSizing: "border-box",
  },
  topMain: {
    display: "block",
    height: "calc(100% - 250px - 75px)",
    width: "calc(100%)",
    boxSizing: "border-box",
    padding: 10,
  },
  topLeft: {
    padding: 10,
    display: "inline-block",
    width: "250px",
    height: "100%",
    boxSizing: "border-box",
    verticalAlign: "top",
    overflow: "auto",
  },
  topRight: {
    display: "inline-block",
    width: "calc(100% - 250px)",
    height: "100%",
    boxSizing: "border-box",
    verticalAlign: "top",
  },

  bottom: {
    padding: 10,
    height: "250px",
    width: "calc(100%)",
    boxSizing: "border-box",
  },
  bottomMain: {
    display: "inline-block",
    width: "calc(100%)",
    height: "100%",
    boxSizing: "border-box",

    // border: "black solid 1px",
  },
});

const App = (props) => {
  const classes = useStyles();
  let { case_inputs } = props;

  const updateResults = () => {
    // api.getProjectionFromReferenceBuildings(
    //   case_inputs,
    //   props.actions.setCaseResults,
    //   props.actions.setIsLoading
    // );
  };

  useEffect(() => {
    updateResults();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      props.actions.setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <InputContainer />
    </ThemeProvider>
  );
};

const mapStateToProps = (store) => {
  return {
    case_inputs: store.case_inputs,
  };
};

export default conn(mapStateToProps)(App);
