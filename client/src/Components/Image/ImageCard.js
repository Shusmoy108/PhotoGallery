import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styles from "./cardstyle";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadow: 1
    };
  }
  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });
  handledelete = () => {
    this.props.deleteimage(this.props.imagename);
  };
  handleopen = () => {
    this.props.handleopen(this.props.imagenumber);
  };
  render() {
    //
    var image = "http://192.168.1.234:8000/files/" + this.props.imagename;
    console.log(image);
    const { classes } = this.props;

    var button;
    if (this.state.shadow === 3) {
      button = (
        <Button color="primary" onClick={this.handledelete}>
          <DeleteIcon />
        </Button>
      );
    }
    console.log(this.state.shadow);
    return (
      <Grid
        item
        xs={6}
        sm={3}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              height="140"
              image={image}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.imagetitle}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button color="primary" onClick={this.handleopen}>
              <InfoIcon />
            </Button>
            {button}
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageCard);
