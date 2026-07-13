import { useDeck } from '../App';
import styles from './SlideCover.module.css';

interface SlideCoverProps {
  kicker?: string;
  title?: string;
  subtitle?: string;
  tags?: string[];
  duration?: string;
}

export function SlideCover(props: SlideCoverProps = {}) {
  const { goNext } = useDeck();
  const { kicker = '项目汇报', title = '项目名称', subtitle = '从这里开始', tags = [], duration = '建议时长 15 min' } = props;

  return (
    <div className={styles.cover}>
      <div className={styles.orbitA} />
      <div className={styles.orbitB} />

      <div className={styles.copy}>
        <p className="section-kicker">{kicker}</p>
        <h1 className={styles.title}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
          <span className={styles.subtitle}>{subtitle}</span>
        </h1>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        )}
        <button className="primary-button" onClick={goNext}>
          开始探索 <b>→</b>
        </button>
      </div>

      <div className={styles.hero}>
        <div className={styles.bubble}>
          先别急着看数据——
          <br />
          把全景图看清楚。
        </div>
        <div className={styles.heroPlaceholder}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="var(--cyan)" strokeWidth="1.5" opacity="0.3" />
            <circle cx="40" cy="40" r="28" stroke="var(--cyan)" strokeWidth="1" opacity="0.5" />
            <circle cx="40" cy="40" r="16" fill="var(--cyan)" opacity="0.15" />
            <circle cx="40" cy="40" r="6" fill="var(--cyan)" opacity="0.5" />
          </svg>
        </div>
        <div className={styles.heroName}>导览 · 今日领航</div>
      </div>

      <div className={styles.meta}>{duration}</div>
    </div>
  );
}
