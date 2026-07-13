import styles from './SlideContent.module.css';

interface SlideContentProps {
  kicker?: string;
  heading?: string;
  subheading?: string;
  content?: string;
  bullets?: string[];
  metrics?: { value: string; label: string }[];
  image?: string;
}

export function SlideContent(props: SlideContentProps = {}) {
  const { kicker, heading, subheading, bullets, metrics, image } = props;

  return (
    <div className={styles.content}>
      {(kicker || heading) && (
        <div className={styles.header}>
          {kicker && <p className="section-kicker">{kicker}</p>}
          {heading && (
            <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
          )}
          {subheading && <p className={styles.sub}>{subheading}</p>}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.text}>
          {bullets && bullets.length > 0 && (
            <ul className={styles.bullets}>
              {bullets.map((b, i) => (
                <li key={i}>
                  <span className={styles.dot} />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {metrics && metrics.length > 0 && (
            <div className={styles.metrics}>
              {metrics.map((m, i) => (
                <div key={i} className={styles.metricCard}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className={styles.image}>
            <img src={image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
