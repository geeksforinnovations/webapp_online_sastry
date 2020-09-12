import React, { useEffect } from "react";
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, MenuItem, Menu } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { APIs } from "../../../APIs/API";
import { setPujaries } from "../../../actions/pujari.actions";
import Pujari from "../../../models/Pujari";
import { connect } from "react-redux";


function PujariList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDataChange, setIsDataChange] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onStatusChange = (status, row) => {

    row.updateStatus(status).then(resp=> {
      console.log('succ');
      handleClose();
      setIsDataChange(!isDataChange)
    })

  }
  useEffect(() => {
    try {
      Pujari.getAll().then(resp => {
        const pujaris = resp.data.map(pujari => {
          return new Pujari(pujari)
        })
        props.setPujaries(pujaris)
      })
    } catch (error) {
      throw error
    }


  }, [isDataChange]);
  const pujariList = Pujari.toList(props.pujaries)
  return (
    <>
      <PageTitle title="Pujari List" />
      {/* <Paper > */}
      <Grid container spacing={4}>
        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell >contactNo</TableCell>
                  <TableCell >type</TableCell>
                  <TableCell >status</TableCell>
                  <TableCell >experience</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pujariList.map(row => (
                  <TableRow key={row.name}>
                    <TableCell>{row.FullName}</TableCell>
                    <TableCell >{row.contactNo}</TableCell>
                    <TableCell >{row.type}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell >{row.experience}</TableCell>
                    <TableCell>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        |||</Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                         
                        <MenuItem onClick={() => onStatusChange('accepted', row)}>Accepted</MenuItem>
                        <MenuItem onClick={() => onStatusChange('requested', row)}>Requested</MenuItem>
                        <MenuItem onClick={() => onStatusChange('denied', row)}>Denied</MenuItem>
                        <MenuItem onClick={() => onStatusChange('inactive', row)}>inactive</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
      </Grid>
      {/* </Paper> */}
    </>
  );
}


const mapStateToProps = state => ({
  pujaries: state.pujaries.availablePujaries
})

const mapDispatchToProps = dispatch => ({

  setPujaries: pujaries => dispatch(setPujaries(pujaries))
})

PujariList.defaultProps = {
  availablePujaries: [],
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PujariList)
