import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
import Modal from '../modal/Modal';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    isOpen: false,
    selectedImage: null,
  };

  render() {
    const { images } = this.props;
    const { selectedImage, isOpen } = this.state;

    return (
      <>
        <ul className={styles.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={() => this.openModal(image)}
            />
          ))}
        </ul>
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          selectedImage={selectedImage}
        />
      </>
    );
  }

  openModal = image => {
    this.setState({
      isOpen: true,
      selectedImage: image,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      selectedImage: null,
    });
  };
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
