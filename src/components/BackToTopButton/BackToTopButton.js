import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import styles from './BackToTopButton.module.css'

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    setVisible(window.scrollY > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    visible && (
      <button className={styles.backToTop} onClick={scrollToTop}>
        <Icon icon="fluent-emoji-high-contrast:top-arrow" style={{ color: 'var(--icon-color)' }} />
      </button>
    )
  )
}

export default BackToTopButton
