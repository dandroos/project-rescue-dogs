import { AnimatePresence, motion } from "framer-motion"
import React from "react"

const FramerMotion = ({ location, children }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default FramerMotion
