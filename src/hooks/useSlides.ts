import { useCallback, useEffect } from 'react';

interface UseSlidesOptions {
  total: number;
  current: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export function useSlides({ total, current, onNext, onPrev, onGoTo }: UseSlidesOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 如果在输入框中，不处理快捷键
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          if (current < total - 1) onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (current > 0) onPrev();
          break;
        case 'f':
        case 'F':
          // 全屏由 useFullscreen hook 处理
          break;
        case 'n':
        case 'N':
          // 备注由全局处理
          break;
        case 't':
        case 'T':
          // 计时器由全局处理
          break;
        case 'm':
        case 'M':
          // 目录由全局处理
          break;
        case 'Home':
          e.preventDefault();
          onGoTo(0);
          break;
        case 'End':
          e.preventDefault();
          onGoTo(total - 1);
          break;
      }
    },
    [total, current, onNext, onPrev, onGoTo],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    isFirst: current === 0,
    isLast: current === total - 1,
    progress: total > 1 ? ((current + 1) / total) * 100 : 100,
  };
}
