// import files and packages
import './App.css';
import AppBar from './components/AppBar';
import axios from 'axios';
import CircularProgress from './components/CircularProgress/CircularProgress';
import DebounceInput from './components/DebounceInput/DebounceInput';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Table from './components/Table';
import { withStyles } from '@material-ui/core/styles';

let counter = 0;

// function to create object for table rows
function createData(streetAddr, city, state, stateAbbr, zipcode, lat, long, oid) {
  counter += 1;
  return { id: counter, streetAddr, city, state, stateAbbr, zipcode, lat, long, oid };
}

// styling for the app page
const styles = () => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: '100vh',
  },
  app: {
    textAlign: 'center',
    height: '100vh',
    flex: 1
  },
});

// define App that extends React's Component class
class App extends Component {

  state = {
    data: [], // array to hold all table rows
    loading: true,  // bool that holds loading state
    searchQuery: ''   // holds search query
  }

  // function to define state and recreate table once fetched data has been received
  updateStateAfterFetch = (arr) => {
    // console.log(arr);
    this.setState({searchQuery: '', data: [], loading: true});

    arr.map(el => {
      return this.setState({
        data: [...this.state.data, createData(el.streetAddress, el.city, el.state, el.stateAbbr, el.zipcode, el.latitude, el.longitude, el._id)]
      });
    });

    this.setState({searchQuery: '', loading: false});
  }

  // loading animation function
  startLoadAnimation = () => {
    this.setState({loading: true});
  }

  // update search query with string typed in textbox
  updateSearchState = (str) => {
    this.setState({searchQuery: str});

    // if empty query string, refetch all data
    if (this.state.searchQuery === '') {
      this.setState({data: [], loading: true}); // empty state array and start loading animation

      var queryURL = '/api/location'; // define query route for GET request

      // make a GET request using axios
      axios.get(queryURL)
        .then(res => {
          // map through response array to create table rows and update state array
          res.data.map(el => {
            return this.setState({
              data: [...this.state.data, createData(el.streetAddress, el.city, el.state, el.stateAbbr, el.zipcode, el.latitude, el.longitude, el._id)]
            });
          });
          this.setState({searchQuery: '', loading: false}); // stop loading animation
        });
    }
  }

  // function to fetch all data when componentWillMount
  componentWillMount() {
    var queryURL = '/api/location';

    // make a GET request using axios
    axios.get(queryURL)
      .then(res => {
        // map through response array to create table rows and update state array
        res.data.map(el => {
          return this.setState({
            data: [...this.state.data, createData(el.streetAddress, el.city, el.state, el.stateAbbr, el.zipcode, el.latitude, el.longitude, el._id)]
          });
        });
        this.setState({loading: false});  // stop loading animation
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        {/* Create AppBar and pass in logo and title as props */}
        <AppBar logo="🌎" title="Maps Database" />

        {/* Create DebounceInput component and pass functions as props */}
        <DebounceInput className={classes.searchBar} updateStateAfterFetch={this.updateStateAfterFetch} updateSearchState={this.updateSearchState}/>

        {/* Create Grid to hold the table */}
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              container

              alignItems='center'
              justify='center'
            >
              {/* Check if state is loading; True? Show loading indicator; else, show the table using data in state */}
              {this.state.loading ? <CircularProgress /> :
                <Table locations={this.state.data} updateStateAfterFetch={this.updateStateAfterFetch} startLoadAnimation={this.startLoadAnimation}/>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
