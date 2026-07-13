import { useDeck } from '../../App';
import styles from './TocPanel.module.css';

export function TocPanel() {
  const { tocVisible, toggleToc, slides, currentIndex, goTo } = useDeck();

  return (
    <>
      <aside
        className={`${styles.panel} ${tocVisible ? styles.open : ''}`}
        aria-hidden={!tocVisible}
      >
        <div className={styles.header}>
          <div>
            <small>COURSE MAP</small>
            <h2>课件目录</h2>
          </div>
          <button className={styles.closeBtn} onClick={toggleToc} aria-label="关闭目录">
            ×
          </button>
        </div>

        <nav className={styles.list}>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              className={`${styles.item} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => {
                goTo(i);
                toggleToc();
              }}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.label}>{slide.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.help}>
          <b>快捷键</b>
          <span>← → / 空格：翻页</span>
          <span>F：全屏　N：备注　T：计时</span>
        </div>
      </aside>

      <div
        className={`${styles.overlay} ${tocVisible ? styles.open : ''}`}
        onClick={toggleToc}
      />
    </>
  );
}
