import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./imagestyle";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Axios from "Utils/Axios";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const file = new FormData();
class Addimage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      imageLink: "",
      imageTitle: "",
      location: "",
      tags: [],
      selectedtags: [],
      tag: "",
      validate: 0
    };
  }
  handleimagelink = e => {
    this.setState({ imageLink: e.target.value });
  };
  handleUploadFile = event => {

    this.setState({ imageLink: event.target.files[0].name });
    file.append("file", event.target.files[0]);

  };
  handleaddimage=()=>{
      file.append("imagelink", this.state.imageLink);
      file.append("imagetitle", this.state.imageTitle);
      file.append("location", this.state.location);
      file.append("selectedtags", this.state.selectedtags);
      if (
          this.state.imageTitle === "" ||
          this.state.location === "" ||
          this.state.selectedtags.length < 1
      ) {
          this.setState({ validate: 1 });
      } else {
          let that = this;
          Axios.addfile(file, function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("imageadded");
                  that.setState({
                      selectedtags: [],
                      imageLink: "",
                      imageTitle: "",
                      location: ""
                  });
              }
          });
      }
  };
  handleimagetitle = e => {
    this.setState({ imageTitle: e.target.value });
  };
  handleimagelocation = e => {
    this.setState({ location: e.target.value });
  };
  handletag = e => {
    this.setState({ tag: e.target.value });
  };

  handleaddtag = e => {
    if (this.state.tag === "") {
      this.setState({ validate: 1 });
    } else {
      let that = this;
      Axios.addtag(this.state.tag, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data.tags);
          that.setState({ tag: "" });
          that.setState({ tags: data.tags });
          console.log(that.state.tags);
        }
      });
    }
  };
  handleChange = event => {
    this.setState({ selectedtags: event.target.value });
  };
  componentDidMount() {
    console.log("here");
    let that = this;
    Axios.showtag(function(err, data) {
      if (err) {
        console.log(err, "err");
        //that.props.history.push("/");
      } else {
        console.log(data);
        that.setState({ tags: data.tags });
      }
    });
  }
  render() {
    const { classes, theme } = this.props;
    let error;
    if (this.state.validate === 1) {
      error = <Typography fontFamily="Roboto">Enter All Fields</Typography>;
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              {error}
              <FormControl
                encType="multipart/form-data"
                className={classes.margin}
              >
                <Typography gutterBottom variant="h5" component="h2">Image Link</Typography>
                <br />
                  <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={this.handleUploadFile}
                  />
                  <Typography gutterBottom variant="h5" component="h2">{this.state.imageLink}</Typography>
                  <label htmlFor="raised-button-file">
                      <Button
                          color="primary"
                          component="span"
                          className={classes.button}
                      >
                          Upload
                      </Button>
                  </label>
                <br />
                <Typography gutterBottom variant="h5" component="h2">Image Title</Typography>
                <br />
                <TextField
                  value={this.state.imageTitle}
                  onChange={this.handleimagetitle}
                  placeholder="Enter the Image Tiltle"
                />
                <br />
                <Typography gutterBottom variant="h5" component="h2">Image Location</Typography>
                <br />
                <TextField
                  value={this.state.location}
                  onChange={this.handleimagelocation}
                  placeholder="Enter the Image Location"
                />
                <br />
                <Typography gutterBottom variant="h5" component="h2" htmlFor="select-multiple-checkbox">
                  {" "}
                  Selected Tags
                </Typography>
                <Select
                  multiple
                  value={this.state.selectedtags}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map((value, index) => (
                        <Chip
                          key={index}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.state.tags.map((tag, index) => (
                    <MenuItem
                      key={index}
                      value={tag.tagName}
                      style={{
                        fontWeight:
                          this.state.tags.indexOf(tag) === -1
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium
                      }}
                    >
                      {tag.tagName}
                    </MenuItem>
                  ))}
                </Select>
                  <Button  variant="contained"
                           color="primary"
                           className={classes.button} onClick={this.handleaddimage}> Add Image </Button></FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormControl className={classes.margin}>
                <Typography gutterBottom variant="h5" component="h2">Image Tags</Typography>
                <br />
                <TextField
                  value={this.state.tag}
                  onChange={this.handletag}
                  placeholder="Enter the Image Tags"
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleaddtag}
                >
                  Add Tag
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Addimage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Addimage);
