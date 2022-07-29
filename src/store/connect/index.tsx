import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

const mapStateToProps = (state: any) => {
  return {
    data: { ...state },
  };
};

const conn = (mapState = mapStateToProps, mapDispatch = mapDispatchToProps) => {
  return connect(mapState, mapDispatch);
};

export { conn };
