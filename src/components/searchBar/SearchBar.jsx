import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGallery from '../imageGallery/ImageGallery';
import Loader from '../loader/Loader';
import styles from './SearchBar.module.css';
import Button from '../button/Button';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [amount] = useState(12);
  const [apiURL] = useState('https://pixabay.com/api');
  const [apiKey] = useState('35920298-91199a46b82f570ed53995cb2');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const onInputChange = e => {
    setInputText(e.target.value);
    setPage(0);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const nextPage = page + 1;
    setIsLoading(true);

    axios
      .get(
        `${apiURL}/?q=${inputText}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${amount}&safesearch=true`
      )
      .then(res => {
        const newImages = res.data.hits;
        if (page === 0) {
          setImages(newImages);
        } else {
          setImages([...images, ...newImages]);
        }
        setIsLoading(false);
        setPage(nextPage);
      })
      .catch(err => console.log(err));
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);

    axios
      .get(
        `${apiURL}/?q=${inputText}&page=${
          page + 1
        }&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${amount}&safesearch=true`
      )
      .then(res => {
        const newImages = res.data.hits;
        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <header className={styles.SearchBar}>
        <form className={styles.SearchForm} onSubmit={onFormSubmit}>
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
            onChange={onInputChange}
          />
        </form>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery images={images} />
          <Button onClick={loadMore} shouldShow={images.length >= 12}>
            Load more...
          </Button>
        </>
      )}
    </>
  );
};

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
