import { useDeck } from '../../App';
import styles from './NotesPanel.module.css';

interface NotesPanelProps {
  note: string;
}

export function NotesPanel({ note }: NotesPanelProps) {
  const { notesVisible, toggleNotes } = useDeck();

  return (
    <aside
      className={`${styles.panel} ${notesVisible ? styles.open : ''}`}
      aria-live="polite"
    >
      <div className={styles.header}>
        <b>讲者备注</b>
        <button className={styles.closeBtn} onClick={toggleNotes}>
          ×
        </button>
      </div>
      <p className={styles.content}>{note}</p>
    </aside>
  );
}
