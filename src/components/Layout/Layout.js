import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Pujas from "../../pages/pujas"

// context
import { useLayoutState } from "../../context/LayoutContext";
import NewPuja from "../../pages/pujas/NewPuja";
import PujariProfile from "../../pages/profile/pujariProfile/pujariProfile";
import PujariList from "../../pages/pujaris/pujariList/pujariList";
import PujariApprovals from "../../pages/admin/pujaris/approvals";
import AdminBookings from "../../pages/bookings/bookings";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/approvals" component={PujariApprovals} />
            <Route path="/app/newpuja" component={NewPuja} />
            <Route path="/app/pujas" component={Pujas} />
            <Route path="/app/pujariprofile" component={PujariProfile} />
            <Route path="/app/pujaries" component={PujariList} />
            <Route path="/app/bookings" component={AdminBookings} />
            
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
