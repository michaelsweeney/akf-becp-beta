import { useRef } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import { TR, TD } from "styling/components";
import DownloadButton from "components/downloadbutton";
import styled from "@mui/styled-engine";

import { DataTableHeadTypes, DataTableTypes } from "types";

type PropTypes = {
  headers: DataTableHeadTypes;
  table_data: DataTableTypes;

  last_row_bold?: boolean;
};

const Wrapper = styled("div")({
  marginBottom: "15px",
});

const DataTable = (props: PropTypes) => {
  const { headers, table_data, last_row_bold } = props;

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

            {table_data.map((row, iy) => {
              return (
                <TR key={iy}>
                  {row.map((cell, ix) => {
                    return (
                      <TD
                        variant={
                          last_row_bold && iy + 1 === table_data.length
                            ? "head"
                            : "body"
                        }
                        key={ix}
                      >
                        {cell}
                      </TD>
                    );
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
