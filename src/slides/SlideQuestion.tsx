import { useState, useCallback } from 'react';
import styles from './SlideQuestion.module.css';

interface Choice {
  letter: string;
  title: string;
  desc: string;
}

interface SlideQuestionProps {
  kicker?: string;
  heading?: string;
  choices?: Choice[];
  correctAnswer?: number;
  feedback?: { correct: string; wrong: string };
}

export function SlideQuestion(props: SlideQuestionProps = {}) {
  const { kicker, heading, choices = [], correctAnswer = 0, feedback } = props;
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = useCallback(
    (i: number) => {
      if (selected !== null) return;
      setSelected(i);
    },
    [selected],
  );

  const isCorrect = selected === correctAnswer;

  return (
    <div className={styles.question}>
      {(kicker || heading) && (
        <div className={styles.header}>
          {kicker && <p className="section-kicker">{kicker}</p>}
          {heading && (
            <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
          )}
        </div>
      )}

      <div className={styles.layout}>
        <div className={styles.choices}>
          {choices.map((c, i) => (
            <button
              key={c.letter}
              className={`${styles.card} ${selected === i ? styles.selected : ''} ${
                selected !== null && i === correctAnswer ? styles.correct : ''
              } ${selected === i && !isCorrect ? styles.wrong : ''}`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              <span className={styles.letter}>{c.letter}</span>
              <strong>{c.title}</strong>
              <small>{c.desc}</small>
            </button>
          ))}

          {selected !== null && feedback && (
            <div className={`${styles.feedback} ${isCorrect ? styles.fbCorrect : styles.fbWrong}`}>
              <b>{isCorrect ? feedback.correct : feedback.wrong}</b>
            </div>
          )}
        </div>

        <div className={styles.visual}>
          <div className={styles.visualPlaceholder}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <rect x="20" y="20" width="80" height="80" rx="12" stroke="var(--line)" strokeWidth="1.5" />
              <circle cx="60" cy="55" r="20" stroke="var(--cyan)" strokeWidth="2" opacity="0.5" />
              <path d="M50 72 Q60 82 70 72" stroke="var(--cyan)" strokeWidth="2" opacity="0.4" />
            </svg>
          </div>
          <p className={styles.visualCaption}>答案藏在数据里</p>
        </div>
      </div>
    </div>
  );
}
