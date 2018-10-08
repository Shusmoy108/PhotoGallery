import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./imagestyle";
import Grid from "@material-ui/core/Grid";
import Axios from "Utils/Axios";
import ImageCard from "./ImageCard";

class ImageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
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
    const { classes, theme } = this.props;
    var imagecards = [];
    for (var i = 0; i < this.state.images.length; i++) {
      imagecards.push(
        <ImageCard
          key={i}
          imagename={this.state.images[i].imageLink}
          imagetitle={this.state.images[i].title}
          location={this.state.images[i].location}
          tags={this.state.images[i].tags}
          deleteimage={this.deleteimage}
        />
      );
      // console.log(imagecards);
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
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
