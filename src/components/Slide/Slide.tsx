import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const variants = {
  enter: { opacity: 0, y: 24, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.98 },
};

interface SlideProps {
  children: ReactNode;
}

export function Slide({ children }: SlideProps) {
  return (
    <motion.section
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </motion.section>
  );
}
