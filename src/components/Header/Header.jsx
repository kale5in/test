import React, { PropTypes, Component } from 'react';
import logo from '../../../Logo.png';
import styles from './Header.sass';

export default class Header extends Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <nav className={styles.headerRow}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="Plarin" />
        </div>
        <div className={styles.searchContainer}>
          <input className={styles.searchbar} placeholder="tuch me" />
          <input className={styles.btn} type="button" value="search" />
        </div>
      </nav>
    );
  }
}
