import { useDeck } from '../../App';
import { Timer } from '../Timer/Timer';
import styles from './TopBar.module.css';

export function TopBar() {
  const { timer, fullscreen, toggleToc, toggleNotes } = useDeck();

  return (
    <header className={styles.topbar}>
      <button
        className={styles.menuButton}
        onClick={toggleToc}
        aria-label="打开目录"
        title="目录（M）"
      >
        <span /><span /><span />
      </button>

      <div className={styles.brand}>
        <span className={styles.brandText}>项目汇报</span>
      </div>

      <div className={styles.actions}>
        <Timer
          formatted={timer.formatted}
          visible={timer.visible}
          running={timer.running}
          onToggle={timer.toggle}
        />
        <button
          className={`${styles.textBtn} ${timer.visible ? styles.active : ''}`}
          onClick={timer.toggleVisibility}
          title="计时器（T）"
        >
          计时
        </button>
        <button
          className={styles.textBtn}
          onClick={toggleNotes}
          title="讲者备注（N）"
        >
          备注
        </button>
        <button
          className={styles.textBtn}
          onClick={fullscreen.toggle}
          title="全屏（F）"
        >
          全屏
        </button>
      </div>
    </header>
  );
}
