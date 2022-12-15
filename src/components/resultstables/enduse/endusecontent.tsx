import EnduseTableControls from "./endusetablecontrols";
import EnduseTable from "./endusetable";
import EnduseSummaryTable from "./endusesummarytable";
interface PropTypes {}

const EnduseContent = (props: PropTypes) => {
  return (
    <div>
      <EnduseTableControls />
      <EnduseSummaryTable />
      <EnduseTable />
    </div>
  );
};
export default EnduseContent;
