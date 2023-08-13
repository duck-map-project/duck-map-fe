import React from 'react';

interface ScrollToTopProps<T extends HTMLElement> {
  targetRef: React.RefObject<T>;
}

const scrollToTop = <T extends HTMLElement>({
  targetRef,
}: ScrollToTopProps<T>) => {
  if (targetRef.current) {
    targetRef.current.scrollTop = 0;
  }
};

export default scrollToTop;
