import React from 'react';
import styles from '../../public/styles/SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBars}>
      <img src='assets/search.png' alt="Search" className={styles.searchIcons} />
      <input type="text" className={styles.searchInputs} />
    </div>
  );
};

export default SearchBar;