import { useState, useRef, useCallback } from 'react';

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    setRunning(true);
    setVisible(true);
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setSeconds(0);
  }, [pause]);

  const toggle = useCallback(() => {
    if (running) {
      pause();
    } else {
      start();
    }
  }, [running, start, pause]);

  const toggleVisibility = useCallback(() => {
    if (visible) {
      pause();
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [visible, pause]);

  const format = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return {
    seconds,
    running,
    visible,
    formatted: format(seconds),
    toggle,
    toggleVisibility,
    reset,
  };
}
