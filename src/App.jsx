import React, { Component } from 'react';
import styles from './App.sass';
import Header from './components/Header';
import TableContainer from './components/TableContainer';
// HACK get data for use in test page
import data from './api/config';
import { getVisibleData } from './utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRegionList: [],
    };
  }

  componentWillMount() {
    this.setState({ visibleRegionList: getVisibleData(data, false) });
  }

  handleSearchSubmit = (query) => {
    this.setState({ visibleRegionList: getVisibleData(data, query) });
  }

  render() {
    const { visibleRegionList } = this.state;
    return (
      <div className={styles.app}>
        <Header onSubmit={this.handleSearchSubmit} />
        <TableContainer items={visibleRegionList} />
      </div>
    );
  }
}
