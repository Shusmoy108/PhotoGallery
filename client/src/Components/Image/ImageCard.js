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
  render() {
    //
    var image = "http://localhost:8000/files/" + this.props.imagename;
    console.log(image);
    const { classes, theme } = this.props;
    var tags = [];
    for (var i = 0; i < this.props.tags.length; i++) {
      tags.push(
        <Typography key={i} variant="h5" component="h3">
          {this.props.tags[i].tagName}
        </Typography>
      );
    }
    var button;
    if (this.state.shadow === 3) {
      button = <Button onClick={this.handledelete}>Delete</Button>;
    }
    console.log(this.state.shadow);
    return (
      <Grid
        item
        xs={2}
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
            <Button onClick={this.handleOpen}>Details</Button>
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
