import React, {useEffect } from "react";
import { connect } from 'react-redux'
import {
  Grid, TableContainer,
  Table, TableBody,
  TableCell, TableHead,
  TableRow, Paper
} from "@material-ui/core";

// import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Puja from "../../models/Puja";
import { APIs } from "../../APIs/API";
import { setPujas } from "../../actions/puja.actions";


function Pujas(props) {
  //let [pujas, setPujas] = useState([])
  useEffect(() => {
    try {
      APIs.getPujas().then(resp => {
        const pujas = resp.data.map(puja => {
          return new Puja(puja)
        })
        props.setPujas(pujas)
      })
    } catch (error) {
      throw error
    }


  });



  return (
    <>
      <PageTitle title="Pujas" />
      <Paper >
        <Grid lg container spacing={4}>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >Cost</TableCell>
                    <TableCell >About</TableCell>
                    <TableCell >Description</TableCell>
                    <TableCell >Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.pujas.map(row => (
                    <TableRow key={row.name}>
                      <TableCell>
                        {row.name}
                      </TableCell>

                      <TableCell >{row.cost}</TableCell>
                      <TableCell >{row.about}</TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell >{row.timeInHrs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        </Grid>
      </Paper>
    </>
  );
}


const mapStateToProps = state => ({
  pujas: state.pujas.availablePujas
})

const mapDispatchToProps = dispatch => ({

  setPujas: pujas => dispatch(setPujas(pujas))
})

Pujas.defaultProps = {
  availablePujas: [],
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pujas)