import styles from './Timer.module.css';

interface TimerProps {
  formatted: string;
  visible: boolean;
  running: boolean;
  onToggle: () => void;
}

export function Timer({ formatted, visible, running, onToggle }: TimerProps) {
  return (
    <div
      className={`${styles.timer} ${visible ? styles.visible : ''} ${running ? styles.running : ''}`}
      onClick={onToggle}
      title={running ? '暂停' : '继续'}
      role="timer"
      aria-live="polite"
    >
      {formatted}
    </div>
  );
}
