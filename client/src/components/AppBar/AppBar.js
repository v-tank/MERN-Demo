// import components from Material UI and React
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// create styling for components
const styles = {
  root: {
    flexGrow: 1,
  },
  nav: {
    background: '#333',
  }, 
  navTitle: {
    margin: 20
  }
};

// Stateless component that takes in props such as logo and title text
function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            {props.logo}
          </Typography>
          
          <Typography variant="title" color="inherit" className={classes.navTitle}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);