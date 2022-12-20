import EnduseTableControls from "./endusetablecontrols";
import EnduseTable from "./endusetable";
import EnduseSummaryTable from "./endusesummarytable";
interface PropTypes {}

const EnduseContent = (props: PropTypes) => {
  return (
    <div>
      <EnduseSummaryTable />
      <EnduseTable />
      <EnduseTableControls />
    </div>
  );
};
export default EnduseContent;
