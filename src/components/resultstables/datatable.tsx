import { useRef } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import { TR, TD } from "styling/components";
import DownloadButton from "components/downloadbutton";
import styled from "@mui/styled-engine";

type PropTypes = {
  headers: string[];
  row_data: (string | number)[][];
};

const Wrapper = styled("div")({
  marginBottom: "15px",
});

const DataTable = (props: PropTypes) => {
  const { headers, row_data } = props;

  const ref = useRef(null);
  return (
    <Wrapper>
      <TableContainer>
        <Table size="small" ref={ref}>
          <TableBody>
            <TR>
              {headers.map((h, i) => (
                <TD variant="head" key={i}>
                  {h}
                </TD>
              ))}
            </TR>

            {row_data.map((row, i) => {
              return (
                <TR key={i}>
                  {row.map((cell, i) => {
                    return <TD key={i}>{cell}</TD>;
                  })}
                </TR>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DownloadButton tableref={ref} />
    </Wrapper>
  );
};

export default DataTable;
