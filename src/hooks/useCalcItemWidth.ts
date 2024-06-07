import { useLayoutEffect, useState } from 'react';

type UseCalcItemWidthProps = React.RefObject<HTMLDivElement>;

const useCalcItemWidth = (primaryRef: UseCalcItemWidthProps) => {
  const [itemWidth, setItemWidth] = useState<number>(0);

  const updateItemWidth = () => {
    if (primaryRef.current) {
      setItemWidth(primaryRef.current.clientWidth);
    }
  };

  useLayoutEffect(() => {
    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  });

  return itemWidth;
};

export default useCalcItemWidth;
