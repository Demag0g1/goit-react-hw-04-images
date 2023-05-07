import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Blocks } from 'react-loader-spinner';
import styles from './Modal.module.css';

const Modal = ({ isOpen, selectedImage, onRequestClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedImage) {
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = selectedImage.largeImageURL;
    img.onload = () => {
      setLoading(false);
    };
  }, [selectedImage]);

  const handleImageLoad = () => {
    setLoading(false);
  };

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
              onLoad={handleImageLoad}
            />
          )}
        </>
      )}
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
