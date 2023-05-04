import { useState, useCallback, useEffect } from 'react';
import { useThrottledFunction } from './useThrottledFunction';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updatePosition = () => {
    setScrollPosition(window.pageYOffset);
  };

  const callbackFnToThrottle = useCallback(() => {
    updatePosition();
  }, []);

  const { throttledFn } = useThrottledFunction({
    callbackFn: callbackFnToThrottle,
    throttleMs: 200,
  });

  useEffect(() => {
    window.addEventListener('scroll', throttledFn);

    return () => {
      window.removeEventListener('scroll', throttledFn);
    };
  }, [throttledFn]);

  return scrollPosition;
};
