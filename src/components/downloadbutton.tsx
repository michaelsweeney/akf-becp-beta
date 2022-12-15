import { htmlTableToCsv } from "dataformat/htmltable";
import { MutableRefObject } from "react";

import { StyledButton } from "styling/components";
import styled from "@mui/styled-engine";

const Wrapper = styled("div")({
  marginTop: "5px",
  marginBottom: "5px",
});

const DownloadButton = (props: { tableref: MutableRefObject<null> }) => {
  const handleClick = () => {
    if (props.tableref.current) {
      let csv_string = htmlTableToCsv(
        props.tableref.current as HTMLTableElement
      );
      let encoded_uri = encodeURI(csv_string as string);
      window.open(encoded_uri);
    }
  };

  return (
    <Wrapper>
      <StyledButton size="small" variant="outlined" onClick={handleClick}>
        Download CSV
      </StyledButton>
    </Wrapper>
  );
};

export default DownloadButton;
