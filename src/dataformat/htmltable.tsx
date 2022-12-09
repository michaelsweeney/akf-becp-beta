import { MutableRefObject } from "react";
import * as d3 from "d3";

export const htmlTableToCsv = (tref: any) => {
  if (tref) {
    let table_data: any[] = [];
    let table = d3.select(tref);
    let rows = table.selectAll("tr").nodes();

    rows.forEach((row) => {
      let row_data: any[] = [];
      let cells = d3.select(row).selectAll("td").nodes();

      cells.forEach((cell) => {
        let val = d3.select(cell).text() as string | number;
        console.log(val);
        console.log(typeof val);
        if (typeof val === "string") {
          val = val.replaceAll(",", "");
        }

        row_data.push(val);
      });
      table_data.push(row_data);
    });

    let line_array: any[] = [];
    table_data.forEach(function (d, i) {
      let line = d.join(",");
      line_array.push(i === 0 ? "data:text/csv;charset=utf-8," + line : line);
    });
    let csv_content = line_array.join("\n");

    var encoded_uri = encodeURI(csv_content);

    window.open(encoded_uri);
  }
};
