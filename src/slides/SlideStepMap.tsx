import { useState } from 'react';
import styles from './SlideStepMap.module.css';

interface Step {
  letter: string;
  label: string;
  subtitle: string;
  detail: string;
  question: string;
}

interface Phase {
  name: string;
  steps: string[];
}

interface SlideStepMapProps {
  kicker?: string;
  heading?: string;
  hint?: string;
  steps?: Step[];
  phases?: Phase[];
}

export function SlideStepMap(props: SlideStepMapProps = {}) {
  const { kicker, heading, hint, steps = [], phases = [] } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = steps[activeIdx];

  return (
    <div className={styles.stepmap}>
      {(kicker || heading) && (
        <div className={styles.header}>
          {kicker && <p className="section-kicker">{kicker}</p>}
          {heading && (
            <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
          )}
          {hint && <p className={styles.hint}>{hint}</p>}
        </div>
      )}

      <div className={styles.map}>
        {steps.map((s, i) => (
          <span key={s.letter} className={styles.connector}>
            <button
              className={`${styles.node} ${i === activeIdx ? styles.activeNode : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              <b>{s.letter}</b>
              <span>{s.label}</span>
              <small>{s.subtitle}</small>
            </button>
            {i < steps.length - 1 && <span className={styles.arrow}>→</span>}
          </span>
        ))}
      </div>

      {active && (
        <div className={styles.detail}>
          <div className={styles.bigLetter}>{active.letter}</div>
          <div>
            <p className={styles.question}>
              先回答：<b>"{active.question}"</b>
            </p>
            <h3>
              {active.label}｜{active.subtitle}
            </h3>
            <p>{active.detail}</p>
          </div>
        </div>
      )}

      {phases.length > 0 && (
        <div className={styles.phases}>
          {phases.map((p) => (
            <span key={p.name}>
              <b>{p.name}</b>：{p.steps.join(' → ')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
