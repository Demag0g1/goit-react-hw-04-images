import React from 'react';
import { Blocks } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default Loader;
