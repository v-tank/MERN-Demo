// import packages for Floating Action Button
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// create styling for FAB 
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

// Define and create button that calls function passed prop to open Form Dialog 
function FloatingActionButtons(props) {
  const { classes, handleClickOpen } = props;
  return (
    <div>
      <Button variant="fab" color="secondary" aria-label="Add" className={classes.button} onClick={()=> handleClickOpen()}>
        <AddIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);