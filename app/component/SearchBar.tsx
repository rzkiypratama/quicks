import React from 'react';
import styles from '../../public/styles/SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <img src='assets/search.png' alt="Search" className={styles.searchIcon} />
      <input type="text" placeholder="Search..." className={styles.searchInput} />
    </div>
  );
};

export default SearchBar;