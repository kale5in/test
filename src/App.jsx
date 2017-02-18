import React, { Component } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import styles from './App.sass';
import Header from './components/Header';
// HACK get data for use in test page
import data from './config';
import { getVisibleData } from './utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRegionList: [],
    };

    this.rowRenderer = this.rowRenderer.bind(this);
  }

  componentWillMount() {
    this.setState({ visibleRegionList: getVisibleData(data, true) });
  }

  rowRenderer({ index, key, style }) {
    const { visibleRegionList } = this.state;
    const item = visibleRegionList[index];
    return (
      <div
        className={styles.row}
        key={key}
        style={style}
      >
        <div className={styles.letter} >
          {item.id}
        </div>
        <div>
          <div className={styles.name}>
            {item.name}
          </div>
        </div>
      </div>
    );
  }
  handleSearchSubmit = (query) => {
    this.setState({ visibleRegionList: getVisibleData(data, query) });
  }

  render() {
    const { visibleRegionList } = this.state;
    console.log(visibleRegionList);
    return (
      <div className={styles.app}>
        <Header onSubmit={this.handleSearchSubmit} />
        <div className={styles.listContainer}>
          <AutoSizer >
            {({ width, height }) => (
              <List
                className={styles.List}
                height={height}
                overscanRowCount={10}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={visibleRegionList.length}
                rowHeight={50}
                rowRenderer={this.rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  _noRowsRenderer() {
    return (
      <div className={styles.noRows}>
        No rows
      </div>
    )
  }


}
