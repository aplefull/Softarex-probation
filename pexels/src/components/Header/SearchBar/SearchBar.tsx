import React from 'react';
import styles from './SearchBar.module.scss';
import icon from '../../../icons/magnifying-glass.svg';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInputChange, performSearch } from '../../../redux/actions';

interface PropTypes {
  isHidden?: boolean;
  width?: number;
  height?: number;
  inputValue: string;
  currentPage: number;
  handleInputChange: any;
  performSearch: Function;
}

function SearchBar(props: PropTypes) {
  const history = useHistory();

  return (
    <div
      className={`${styles.inputWrapper} ${
        props?.isHidden ? styles.hidden : ''
      }`}
      style={{
        height: props.height ? `${props.height}px` : '',
        width: props.width ? `${props.width}px` : '',
      }}
    >
      <input
        type="text"
        placeholder="Search for free photos"
        value={props.inputValue}
        onChange={(e) => {
          props.handleInputChange(e.target.value);
        }}
        onKeyPress={(e: any) => {
          if (e.code === 'Enter' && props.inputValue.trim().length > 0) {
            history.push(`/search/${encodeURIComponent(props.inputValue)}`);
            window.scrollTo(0, 0);
            props.performSearch(props.inputValue, props.currentPage);
          }
        }}
      />
      <img
        src={icon}
        alt="search icon"
        onClick={() => {
          if (props.inputValue.trim().length > 0) {
            history.push(`/search/${encodeURIComponent(props.inputValue)}`);
            window.scrollTo(0, 0);
            props.performSearch(props.inputValue, props.currentPage);
          }
        }}
      />
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    inputValue: state.searchBarReducer.inputValue,
    currentPage: state.photosReducer.currentPage,
  };
}

const mapDispatchToProps = {
  handleInputChange,
  performSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
