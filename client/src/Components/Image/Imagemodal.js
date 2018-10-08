import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.handleclose();
    };

    render() {
        const { classes } = this.props;
        var tags = [];
        for (var i = 0; i < this.props.tags.length; i++) {
            tags.push(
                <Typography key={i} variant="h5" component="h3">
                    {this.props.tags[i]}
                </Typography>
            );
        }
        return (
            <div>
                <Typography gutterBottom>Click to get the full Modal experience!</Typography>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Image-Name: {this.props.imagename}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                        Image-Title: {this.props.title}
                    </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Image-Location: {this.props.location}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Image-Tags:
                        </Typography>
                        {tags}
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;