import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
  },
  textField: {
    // margin:'0 10px',
    // padding:'0 10px',
     //border:'1px solid yellow',
    width:'100%'
  },
  paper:{
    padding:'0 10px'
  },
  fileInput:{
    display:'none'
  }

}));