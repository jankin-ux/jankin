import { useDeck } from '../App';
import styles from './SlideEnd.module.css';

interface SummaryItem {
  char: string;
  label: string;
}

interface SlideEndProps {
  kicker?: string;
  heading?: string;
  summary?: SummaryItem[];
  slogan?: string;
  sources?: string;
}

export function SlideEnd(props: SlideEndProps = {}) {
  const { kicker, heading, summary = [], slogan, sources } = props;
  const { goTo } = useDeck();

  return (
    <div className={styles.end}>
      <div className={styles.glow} />

      <div className={styles.copy}>
        {kicker && <p className="section-kicker">{kicker}</p>}
        {heading && (
          <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
        )}

        {summary.length > 0 && (
          <div className={styles.flow}>
            {summary.map((item) => (
              <span key={item.char}>
                <b>{item.char}</b>
                <small>{item.label}</small>
              </span>
            ))}
          </div>
        )}

        {slogan && <p className={styles.slogan}>{slogan}</p>}

        <button className="secondary-button" onClick={() => goTo(0)}>
          ↻ 再看一遍
        </button>
      </div>

      <div className={styles.heroEnd}>
        <div className={styles.bubble}>
          数据只是工具——
          <br />
          <b>行动才是关键。</b>
        </div>
        <div className={styles.heroPlaceholder}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="var(--cyan)" strokeWidth="1.5" opacity="0.3" />
            <circle cx="40" cy="40" r="20" stroke="var(--cyan)" strokeWidth="1" opacity="0.5" />
            <circle cx="40" cy="40" r="8" fill="var(--cyan)" opacity="0.3" />
          </svg>
        </div>
      </div>

      {sources && <div className={styles.source}>{sources}</div>}
    </div>
  );
}
