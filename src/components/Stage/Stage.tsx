import { AnimatePresence } from 'framer-motion';
import { useDeck } from '../../App';
import { Slide } from '../Slide/Slide';
import styles from './Stage.module.css';

export function Stage() {
  const { slides, currentIndex } = useDeck();
  const current = slides[currentIndex];
  const { Component, props = {} } = current;

  return (
    <main className={styles.stage}>
      <AnimatePresence mode="wait">
        <Slide key={current.id}>
          <Component {...props} />
        </Slide>
      </AnimatePresence>
    </main>
  );
}
