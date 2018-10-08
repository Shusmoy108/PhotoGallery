import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ImageBody from "../Components/Image/Imagebody";
const styles = theme => ({
  bar: {
    padding: "0 10%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 1
    }
  }
});

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <ImageBody />
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
