import { useRef, useState, useEffect } from "react";

import { D3WrapperCallbackPropTypes } from "types";

import styled from "@mui/styled-engine";
import * as d3 from "d3";

import { useAppSelector } from "store/hooks";

export type PropTypes = {
  createChartCallback: (d: D3WrapperCallbackPropTypes) => void;
};

const Root = styled("div")({});

const SVGWrapper = (props: PropTypes) => {
  const { sidebar_open } = useAppSelector((state) => state.ui_settings);
  const { case_inputs } = useAppSelector((state) => state);

  const [containerDimensions, setContainerDimensions] = useState({
    width: 50,
    height: 50,
  });

  const [dimensionsInitialized, setDimensionsInitialized] = useState(false);

  const { createChartCallback } = props;

  const ref = useRef<HTMLDivElement>(null);

  const dispatchDimensions = () => {
    if (ref.current) {
      const getElBox = (sel: string) => {
        return document.querySelector(sel)?.getBoundingClientRect() as DOMRect;
      };
      // const bottom_padding = 5;

      let height = d3.sum([
        getElBox(".center-view-container")?.height,

        // -bottom_padding,
      ]);

      let width = getElBox(".view-container")?.width;

      setContainerDimensions({ width, height });
      setDimensionsInitialized(true);
    }
  };

  // recreate chart
  useEffect(() => {
    if (ref.current) {
      createChartCallback({
        container_ref: ref.current,
        container_dimensions: containerDimensions,
      });
    }
  }, [createChartCallback, containerDimensions]);

  // handle resize & sidebar
  useEffect(() => {
    const handleResize = () => {
      dispatchDimensions();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // initial dimensions
  useEffect(() => {
    if (!dimensionsInitialized) {
      dispatchDimensions();
    }
  });

  // dispatch when sidebar changes
  useEffect(() => {
    setTimeout(dispatchDimensions, 300);
  }, [sidebar_open]);

  // dispatch when inputs change
  useEffect(() => {
    dispatchDimensions();
  }, [case_inputs]);

  return <Root ref={ref}></Root>;
};

export default SVGWrapper;
