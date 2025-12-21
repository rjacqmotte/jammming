import styles from './SearchBarLogic.module.css';
import React, { useState } from 'react';
import SearchBarView from '../SearchBarView/SearchBarView';

function SearchBarLogic(props) {

  return (
    <SearchBarView
      onSearchChange={props.onSearchChange}
      onSearch={props.onSearch}
      searchValue={props.searchValue}
    />
  );
}

export default SearchBarLogic;
