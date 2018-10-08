import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import styles from "./headerstyle";
import Icon from "@material-ui/core/Icon/Icon";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleProfileMenuOpen = event => {};

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.bar}>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    Gallery
                </Button>
            <div className={classes.grow} />
            <div>
              <Hidden only={["md", "lg", "xl"]}>
                <Icon
                  className={classes.icon}
                  //onClick={() => this.props.history.push("/addimage")}
                  component={Link}
                  to="/addimage"
                >
                  add_circle
                </Icon>
              </Hidden>
              <Hidden only={["sm", "xs"]}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/addimage"
                >
                  Add Image
                </Button>
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
