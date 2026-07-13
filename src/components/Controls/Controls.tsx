import { useDeck } from '../../App';
import styles from './Controls.module.css';

interface ControlsProps {
  progress: number;
  isFirst: boolean;
  isLast: boolean;
}

export function Controls({ progress, isFirst, isLast }: ControlsProps) {
  const { goPrev, goNext, currentIndex, totalSlides } = useDeck();

  return (
    <footer className={styles.controls}>
      <button
        className={styles.navBtn}
        onClick={goPrev}
        disabled={isFirst}
        aria-label="上一页"
      >
        ←
      </button>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.counter}>
        <b>{String(currentIndex + 1).padStart(2, '0')}</b>
        <span>/</span>
        <span>{String(totalSlides).padStart(2, '0')}</span>
      </div>

      <button
        className={styles.navBtn}
        onClick={goNext}
        disabled={isLast}
        aria-label="下一页"
      >
        →
      </button>
    </footer>
  );
}
