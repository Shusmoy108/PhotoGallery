import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageBody from "../Components/Image/Imagebody";
import Hidden from "@material-ui/core/Hidden";
import styles from "./landing";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { withStyles } from "@material-ui/core/styles";

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bar}>
        <ImageBody />
        <Hidden only={["sm", "md", "lg", "xl"]}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            component={Link}
            to="/addimage"
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </Hidden>
      </div>
    );
  }
}
LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
