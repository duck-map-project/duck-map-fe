import React, { useEffect } from 'react';

interface useScrollProps<T extends HTMLElement> {
  targetRef: React.RefObject<T>;
  isFetching: boolean;
  isLast: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const useScroll = <T extends HTMLElement>({
  targetRef,
  isFetching,
  isLast,
  page,
  setPage,
}: useScrollProps<T>) => {
  const scrollArea = targetRef.current;

  useEffect(() => {
    if (scrollArea) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollArea;
        const isScrolledToEnd = scrollTop + clientHeight >= scrollHeight;

        if (isScrolledToEnd && !isFetching && !isLast) {
          setPage((prev) => prev + 1);
        }
      };

      scrollArea.addEventListener('scroll', handleScroll);

      return () => {
        scrollArea.removeEventListener('scroll', handleScroll);
      };
    }
  }, [page, isFetching, scrollArea, targetRef]);
};

export default useScroll;
