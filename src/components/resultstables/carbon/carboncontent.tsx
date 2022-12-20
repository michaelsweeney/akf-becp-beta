import CarbonTableControls from "./carbontablecontrols";
import CarbonProjectionTable from "./carbonprojectiontable";
import CarbonSummaryTable from "./carbonsummarytable";

const CarbonContent = () => {
  return (
    <div>
      <CarbonSummaryTable />
      <CarbonProjectionTable />
      <CarbonTableControls />
    </div>
  );
};
export default CarbonContent;
