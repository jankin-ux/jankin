import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { slides as slidesData, type SlideData } from './data/slides';
import { useSlides } from './hooks/useSlides';
import { useTimer } from './hooks/useTimer';
import { useFullscreen } from './hooks/useFullscreen';
import { TopBar } from './components/TopBar/TopBar';
import { Stage } from './components/Stage/Stage';
import { Controls } from './components/Controls/Controls';
import { TocPanel } from './components/TocPanel/TocPanel';
import { NotesPanel } from './components/NotesPanel/NotesPanel';
import styles from './App.module.css';

interface DeckState {
  currentIndex: number;
  totalSlides: number;
  notesVisible: boolean;
  tocVisible: boolean;
  timer: ReturnType<typeof useTimer>;
  fullscreen: ReturnType<typeof useFullscreen>;
  slides: SlideData[];
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  toggleNotes: () => void;
  toggleToc: () => void;
}

const DeckContext = createContext<DeckState | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error('useDeck must be inside DeckProvider');
  return ctx;
}

export default function App() {
  const [slides] = useState<SlideData[]>(slidesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesVisible, setNotesVisible] = useState(false);
  const [tocVisible, setTocVisible] = useState(false);
  const timer = useTimer();
  const fullscreen = useFullscreen();

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);

  const toggleNotes = useCallback(() => setNotesVisible((v) => !v), []);
  const toggleToc = useCallback(() => setTocVisible((v) => !v), []);

  const slideMeta = useSlides({
    total: slides.length,
    current: currentIndex,
    onNext: goNext,
    onPrev: goPrev,
    onGoTo: goTo,
  });

  // 全局快捷键（F/N/T/M）
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      switch (e.key) {
        case 'f': case 'F': fullscreen.toggle(); break;
        case 'n': case 'N': e.preventDefault(); toggleNotes(); break;
        case 't': case 'T': e.preventDefault(); timer.toggleVisibility(); break;
        case 'm': case 'M': e.preventDefault(); toggleToc(); break;
      }
    },
    [fullscreen, toggleNotes, timer, toggleToc],
  );

  // 注册全局键盘事件（F/N/T/M 在 App 层处理）
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentSlide = slides[currentIndex];

  const ctx: DeckState = {
    currentIndex,
    totalSlides: slides.length,
    notesVisible, tocVisible,
    timer, fullscreen,
    slides,
    goNext, goPrev, goTo,
    toggleNotes, toggleToc,
  };

  return (
    <DeckContext.Provider value={ctx}>
      <div className={styles.deck}>
        <TopBar />
        <Stage />
        <Controls progress={slideMeta.progress} isFirst={slideMeta.isFirst} isLast={slideMeta.isLast} />
        <TocPanel />
        <NotesPanel note={currentSlide.notes} />
      </div>
    </DeckContext.Provider>
  );
}
