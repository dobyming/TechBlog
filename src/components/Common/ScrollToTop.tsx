import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'

const scrollVariants = {
  initial: { y: '.5rem', opacity: 0 },
  animate: {
    y: '0rem',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const MotionButton = styled(motion.button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 3rem;
`

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  // when to show toggleBtn
  const toggleVisibility = () => {
    window.pageYOffset > 400 ? setIsVisible(true) : setIsVisible(false)
  }

  // make scroll smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // trigger event in mount state
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionButton
          onClick={scrollToTop}
          variants={scrollVariants}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          <FontAwesomeIcon
            className="ScrollToTop"
            icon={faArrowAltCircleUp}
            height="40px"
            width="40px"
          />
        </MotionButton>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
