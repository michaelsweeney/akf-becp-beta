import * as d3 from "d3";
import { D3SelectionType } from "types";
export const bindD3Element = (
  parent: any,
  childtype: string,
  classname: string
) => {
  let selection: D3SelectionType;

  if (typeof parent.querySelectorAll === "function") {
    selection = d3.select(parent);
  } else {
    selection = parent;
  }
  return selection
    .selectAll(`.${classname}`)
    .data([0])
    .join(childtype)
    .attr("class", classname);
};
