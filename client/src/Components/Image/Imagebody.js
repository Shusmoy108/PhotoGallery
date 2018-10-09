import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./imagestyle";
import Grid from "@material-ui/core/Grid";
import Axios from "Utils/Axios";
import ImageCard from "./ImageCard";
import InputModal from "./Imagemodal";

class ImageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      open: false,
      imagenumber: -1
    };
  }
  deleteimage = e => {
    let that = this;
    Axios.deleteimage(e, function(err, data) {
      if (err) {
        console.log(err, "err");
        //that.props.history.push("/");
      } else {
        console.log(data);
        that.setState({ images: data.images });
      }
    });
  };
  handleOpen = e => {
    this.setState({ open: true });
    this.setState({ imagenumber: e });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ imagenumber: -1 });
  };
  componentDidMount() {
    let that = this;
    Axios.showimages(function(err, data) {
      if (err) {
        console.log(err, "err");
        //that.props.history.push("/");
      } else {
        console.log(data);
        that.setState({ images: data.images });
      }
    });
  }
  render() {
    const { classes } = this.props;
    var imagecards = [];
    let modal;
    if (this.state.open) {
      modal = (
        <InputModal
          open={this.state.open}
          handleclose={this.handleClose}
          imagename={this.state.images[this.state.imagenumber].imageLink}
          title={this.state.images[this.state.imagenumber].title}
          location={this.state.images[this.state.imagenumber].location}
          tags={this.state.images[this.state.imagenumber].tags}
        />
      );
    }
    for (var i = 0; i < this.state.images.length; i++) {
      imagecards.push(
        <ImageCard
          key={i}
          imagename={this.state.images[i].imageLink}
          imagetitle={this.state.images[i].title}
          location={this.state.images[i].location}
          tags={this.state.images[i].tags}
          deleteimage={this.deleteimage}
          handleopen={this.handleOpen}
          imagenumber={i}
        />
      );
      // console.log(imagecards);
    }
    return (
      <div className={classes.root}>
        {modal}
        <Grid container spacing={8}>
          {imagecards}
        </Grid>
      </div>
    );
  }
}

ImageBody.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ImageBody);
