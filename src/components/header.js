import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: "100%",
    height: "100%",
    borderBottom: "black solid 1px",
  },
  left: {
    display: "inline-block",
    width: "250px",
    // backgroundColor: "blue",
    height: "100%",
    verticalAlign: "middle",
    // textAlign: "center",
  },
  middle: {
    display: "inline-block",
    width: "calc(100% - 350px)",
    // backgroundColor: "yellow",
    height: "100%",
    verticalAlign: "middle",
    textAlign: "center",
  },
  right: {
    display: "inline-block",
    width: "100px",
    // backgroundColor: "purple",
    height: "100%",
    verticalAlign: "middle",
    textAlign: "center",
  },
  imageContainer: {
    display: "inline-block",

    marginLeft: 40,
    marginTop: 10,
    // left: 30,
  },
  title: {
    display: "inline-block",
    verticalAlign: "middle",
    height: "100%",
    // textAlign: "center",
    fontSize: "24px",
    marginLeft: 15,
    position: "relative",
    top: 20,
    fontWeight: "600",
    color: "#28375A",
  },
});
const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <div className={classes.imageContainer}>
          <img alt="" width="100" src="akf-logo.png" />
        </div>
      </div>
      <div className={classes.middle}>
        <div className={classes.title}>
          Building Energy Carbon Projection Tool
        </div>
      </div>
      <div className={classes.right}></div>
    </div>
  );
};
export { Header };
