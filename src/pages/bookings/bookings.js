import React, { useEffect } from "react";
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { setBookings } from "../../actions/bookings.actions";
import Booking from "../../models/Booking";
import { connect } from "react-redux";

 function AdminBookings(props) {
  useEffect(() => {
    try {
      Booking.getAll().then(resp => {
        const bookings = resp.data;
        props.setBookings(bookings)
      })
    } catch (error) {
      throw error
    }


  }, [true]);

   let {availableBookings} = props;
   availableBookings = availableBookings.map(booking=> new Booking(booking))

  return (
    <>
      <PageTitle title="Admin Bookings" />
      <Grid container spacing={4}>
        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Puja</TableCell>
                  <TableCell >Date</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell>puja Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableBookings.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell >{row.customerName}</TableCell>
                    <TableCell >{row.puja.name}</TableCell>
                    <TableCell >{row.pujaStartDate}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell>
                      {row.pujaType}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
      </Grid>
      
    </>
  );
}



const mapStateToProps = state => ({
  availableBookings: state.booking.availableBookings
})

const mapDispatchToProps = dispatch => ({

  setBookings: bookings => dispatch(setBookings(bookings))
})

AdminBookings.defaultProps = {
  availableBookings: [],
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBookings)