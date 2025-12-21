import styles from './SearchBarLogic.module.css';
import React, { useState } from 'react';
import SearchBarView from '../SearchBarView/SearchBarView';

function SearchBarLogic(props) {
  const [userInput, setUserInput] = useState();

  function handleUserInput(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    console.log('handlesubmit acitf');
    e.preventDefault();
    alert('test');
  }

  return (
    <SearchBarView
      onChange={handleUserInput}
      onSearch={props.onSearch}
      inputValue={userInput}
    />
  );
}

export default SearchBarLogic;
