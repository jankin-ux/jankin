import { useState } from 'react';
import styles from './SlideConcept.module.css';

interface Concept {
  key: string;
  label: string;
  icon: string;
  title: string;
  desc: string;
}

interface SlideConceptProps {
  kicker?: string;
  heading?: string;
  word?: string;
  concepts?: Concept[];
}

export function SlideConcept(props: SlideConceptProps = {}) {
  const { kicker, heading, word = '核心', concepts = [] } = props;
  const [activeKey, setActiveKey] = useState(concepts[0]?.key ?? '');

  const active = concepts.find((c) => c.key === activeKey) ?? concepts[0];

  return (
    <div className={styles.concept}>
      {(kicker || heading) && (
        <div className={styles.header}>
          {kicker && <p className="section-kicker">{kicker}</p>}
          {heading && (
            <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
          )}
        </div>
      )}

      <div className={styles.word}>
        {word.split('').map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>

      <div className={styles.tabs} role="tablist">
        {concepts.map((c) => (
          <button
            key={c.key}
            className={`${styles.tab} ${c.key === activeKey ? styles.active : ''}`}
            onClick={() => setActiveKey(c.key)}
            role="tab"
            aria-selected={c.key === activeKey}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.activeContent}>
          <div className={styles.icon}>{active.icon}</div>
          <div>
            <h3>{active.title}</h3>
            <p>{active.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
