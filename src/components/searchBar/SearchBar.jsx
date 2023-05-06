import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGallery from '../imageGallery/ImageGallery';
import Loader from '../loader/Loader';
import styles from './SearchBar.module.css';
import Button from '../button/Button';

class SearchBar extends Component {
  state = {
    inputText: '',
    amount: 12,
    apiURL: 'https://pixabay.com/api',
    apiKey: '35920298-91199a46b82f570ed53995cb2',
    images: [],
    isLoading: false,
    page:0 ,
  };
allImages=[];
  onInputChange = e => {
    this.setState({ inputText: e.target.value ,images: [],page:0});
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { inputText, amount, apiURL, apiKey, page } = this.state;
    const nextPage = page + 1;
    this.setState({ isLoading: true,  });
  
    axios
      .get(
        `${apiURL}/?q=${inputText}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${amount}&safesearch=true`
      )
      .then(res => {
        const newImages = res.data.hits;
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          page: nextPage,
        }));
      })
      .catch(err => console.log(err));
  };
  

  render() {
    const { inputText, images, isLoading, } = this.state;

    return (
      <>
        <header className={styles.SearchBar}>
          <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
            <button className={styles['SearchForm-button']} type="submit">
              <span className={styles['SearchForm-button-label']}>Search</span>
            </button>
            <input
              className={styles['SearchForm-input']}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputText}
              onChange={this.onInputChange}
            />
          </form>
        </header>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ImageGallery images={images} />
            <Button onClick={this.onFormSubmit} shouldShow={images.length >0}>
              Load more...
            </Button>
          </>
        )}
      </>
    );
  }
}

SearchBar.propTypes = {
  inputText: PropTypes.string,
  amount: PropTypes.number,
  apiURL: PropTypes.string,
  apiKey: PropTypes.string,
  page: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default SearchBar;
