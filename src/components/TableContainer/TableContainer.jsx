import React, { PropTypes, PureComponent } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import SortDirection from './SortDirection';
import { sortByString, sortByNumber } from '../../utils';
import styles from './TableContainer.sass';

export default class App extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      sortBy: 'id',
      sortDirection: SortDirection.ASC,
    }
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
  sort = ({ sortBy, sortDirection }) => {
    this.setState({ sortBy, sortDirection })
  }

  render() {
    const { items } = this.props;
    const { sortDirection, sortBy } = this.state;

    const sortedItems = sortBy === 'name' ? sortByString(items, sortDirection === SortDirection.ASC, sortBy)
    : sortByNumber(items, sortDirection === SortDirection.ASC, sortBy);

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
              rowCount={sortedItems.length}
              width={width}
              rowGetter={({ index }) => sortedItems[index]}
              sortDirection={sortDirection}
              sortBy={sortBy}
              sort={this.sort}
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
                width={300}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
