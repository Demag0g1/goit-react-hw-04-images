import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Blocks } from 'react-loader-spinner';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {
    loading: true,
  };

  handleImageLoad = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    const { selectedImage } = this.props;

    if (!selectedImage) {
      this.setState({ loading: false });
      return;
    }

    const img = new Image();
    img.src = selectedImage.largeImageURL;
    img.onload = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    const { isOpen, selectedImage, onRequestClose } = this.props;
    const { loading } = this.state;

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName={styles.Overlay}
        className={styles.Modal}
        appElement={document.getElementById('root')}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        stylize={styles.customStyles}
      >
        {loading ? (
          <Blocks />
        ) : (
          <>
            {selectedImage && (
              <img
                src={selectedImage.largeImageURL}
                alt={selectedImage.tags}
                onLoad={this.handleImageLoad}
              />
            )}
          </>
        )}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
