// src/components/BackToTopButton.js
import React, { useEffect, useState } from 'react';
import styles from './BackToTopButton.module.css';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 300); // 当滚动超过300px时显示按钮
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    visible && (
      <button className={styles.backToTop} onClick={scrollToTop}>
        ▲
      </button>
    )
  );
};

export default BackToTopButton;
