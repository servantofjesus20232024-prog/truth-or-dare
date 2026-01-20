'use client';

import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    <p className={styles.modalMessage}>{message}</p>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButton} onClick={onClose}>Got it</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
