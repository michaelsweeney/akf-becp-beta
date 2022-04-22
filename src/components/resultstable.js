import { IconSvg } from "./svgicons";

import { useEffect, useState } from "react";

import { conn } from "../store/connect";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/styles";
import { plot_margins } from "./plots/plotcontainer";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

// small table style:
// https://mui.com/material-ui/react-table/

const box_width = 325;

const useStyles = makeStyles({
  root: {
    width: `${box_width}px`,
    // height: "400px",
    position: "absolute",
    // backgroundColor: "rgb(220,220,220)",
    backgroundColor: "white",
    zIndex: "5",
    // left: 0,
    border: "gray solid 1px",
  },
});

const ResultsTable = (props) => {
  const {
    case_results_displayed,
    case_comparison_displayed,
    icon_array_displayed,
    window_dimensions,
    is_plot_hover,
  } = props;

  const formatFrac = d3.format(",.2");
  const formatPct = d3.format(",.1%");
  const classes = useStyles();

  const tableStyles = {
    root: {},
    headTDStyle: {
      textAlign: "center",
      fontSize: 12,
      // width: 20,
      padding: "5px",
      lineHeight: 1,
      borderBottom: "none",
      // borderBottom: "rgb(200,200,200) solid 1px",
    },
    bodyTDStyle: {
      fontSize: 12,
      // width: 20,
      padding: 0,
      textAlign: "center",
      border: "none",
    },
    rowHeadStyle: {},

    rowStyle: {
      border: "none",
    },
  };

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // find and calculate position and sizing of existing d3 plot.
    // manually calculate position.
    let element = document.getElementById("plot-container-element");
    if (element) {
      let box_padding = 10;
      let bbox = element.getBoundingClientRect();

      let plot_width = bbox.width - plot_margins.l - plot_margins.r;
      let plot_height = bbox.height - plot_margins.t - plot_margins.b;

      let left_pos =
        bbox.x + plot_margins.l + plot_width - box_width - box_padding;

      let top_pos = bbox.y + plot_margins.t + box_padding;

      setPosition({ left: left_pos, top: top_pos });
    }
  }, [window_dimensions]);

  return (
    <div
      style={{
        top: position.top,
        left: position.left,
        opacity: is_plot_hover ? 0 : 1,
        transition: "opacity 250ms",
      }}
      className={classes.root}
    >
      <Table sx={tableStyles.root} size="small">
        <TableHead sx={tableStyles.rowHeadStyle}>
          <TableRow>
            {/* <TableCell sx={tabelStyles.headTDStyle}>Case Name</TableCell> */}
            <TableCell sx={tableStyles.headTDStyle}></TableCell>
            <TableCell sx={tableStyles.headTDStyle}>
              2022 <br />
              (kg/sf/yr)
            </TableCell>
            <TableCell sx={tableStyles.headTDStyle}>
              2050 <br />
              (kg/sf/yr)
            </TableCell>
            <TableCell sx={tableStyles.headTDStyle}>
              2022 <br />
              (% v base)
            </TableCell>
            <TableCell sx={tableStyles.headTDStyle}>
              2050 <br />
              (% v base)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {case_comparison_displayed.map((alt, alt_i) => {
            return (
              <TableRow sx={tableStyles.rowStyle} key={alt_i}>
                {/* <TableCell sx={tabelStyles.bodyTDStyle}>{alt.name}</TableCell> */}
                <TableCell sx={tableStyles.bodyTDStyle}>
                  <div style={{ position: "relative", marginLeft: 10 }}>
                    <IconSvg
                      fill={icon_array_displayed[alt_i].case_color}
                      d={icon_array_displayed[alt_i].case_icon_d}
                    />
                  </div>
                </TableCell>
                <TableCell sx={tableStyles.bodyTDStyle}>
                  {formatFrac(alt.val_2022)}
                </TableCell>
                <TableCell sx={tableStyles.bodyTDStyle}>
                  {formatFrac(alt.val_2050)}
                </TableCell>
                <TableCell sx={tableStyles.bodyTDStyle}>
                  {formatPct(alt.pct_2022)}
                </TableCell>
                <TableCell sx={tableStyles.bodyTDStyle}>
                  {formatPct(alt.pct_2050)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    case_comparison_displayed: store.case_outputs.case_comparison_displayed,
    case_results_displayed: store.case_outputs.case_results_displayed,
    icon_array_displayed: store.case_outputs.icon_array_displayed,
    plot_config: store.plot_config,
    is_plot_hover: store.ui.isPlotHover,
    window_dimensions: store.ui.dims,
  };
};

export default conn(mapStateToProps)(ResultsTable);
