import React, { PropTypes, Component } from 'react';
import logo from '../../../Logo.png';
import styles from './Header.sass';

export default class Header extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleClick = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state.query);
  }

  handleChange = (value) => {
    this.setState({ query: value });
  }

  render() {
    return (
      <nav className={styles.headerRow}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src={logo}
            alt="Plarin"
          />
        </div>
        <div className={styles.searchContainer}>
          <input
            ref={(input) => { this.input = input; }}
            className={styles.searchInput}
            type="text"
            placeholder="Введите ID, набор ID через запятую, название региона или города."
            value={this.state.query}
            onChange={(e) => this.handleChange(e.target.value)}
          />
          <input
            className={styles.btn}
            type="button"
            value="Искать"
            onClick={this.handleClick}
          />
        </div>
      </nav>
    );
  }
}
