import React from 'react';
import styles from './Modal.module.css';

const Modal = ({
  show,
  children,
  close,
}: {
  show: boolean;
  children: React.ReactNode;
  close: () => void;
}) => {
  let content = null;
  if (show) {
    content = (
      <div className={styles.backdrop} onClick={close}>
        <div
          className={styles.container}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return content;
};

export default Modal;
