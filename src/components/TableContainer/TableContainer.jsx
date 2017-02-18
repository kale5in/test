import React, { PropTypes, PureComponent } from 'react';
import { List, AutoSizer, Table, Column } from 'react-virtualized';
import styles from './TableContainer.sass';

export default class App extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  noRowsRenderer = () => {
    return (
      <div className={styles.noRows}>
        No rows
      </div>
    );
  }

  rowRenderer = ({ index, key, style }) => {
    const { items } = this.props;
    const item = items[index];
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

  rowClassName = ({ index }) => {
    if (index < 0) {
      return styles.headerRow;
    } else return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  }

  render() {
    const { items } = this.props;
    return (
      <div className={styles.tableContainer}>
        <AutoSizer >
          {({ width, height }) => (
            <Table
              disableHeader={false}
              headerClassName={styles.headerColumn}
              headerHeight={30}
              height={height}
              noRowsRenderer={this.noRowsRenderer}
              overscanRowCount={10}
              rowClassName={this.rowClassName}
              rowHeight={40}
              rowCount={items.length}
              width={width}
              rowGetter={({ index }) => items[index]}
            >
                <Column
                  label='id'
                  cellDataGetter={
                    ({ columnData, dataKey, rowData }) => rowData.id
                  }
                  dataKey='id'
                  width={60}
                />
                <Column
                  label='Регион'
                  dataKey='name'
                  cellDataGetter={
                    ({ columnData, dataKey, rowData }) => rowData.name
                  }
                  width={250}
                />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
