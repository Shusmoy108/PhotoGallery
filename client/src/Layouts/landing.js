const styles = theme => ({
  bar: {
    padding: "0% 0%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 1
    }
  },
  button: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  icon: {
    margin: theme.spacing.unit * 3,
    position: "fixed",
    bottom: 10,
    right: 10
  }
});
export default styles;
