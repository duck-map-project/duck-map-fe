import { FormEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

import ring from '../assets/icons/ring.svg';
import px2vw from '../utils/px2vw';

export const PageWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px ${px2vw(142)} 0 ${px2vw(144)};
`;

export const ContentBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffbe2;
  padding: 81px ${px2vw(49)} 24px ${px2vw(45)};
  border: 2px solid #1e232c;
  border-radius: 20px;
  position: relative;
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #fffbe2;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 14px;
    z-index: -9;
  }
`;

export const RingsWrapper = styled.section`
  display: flex;
  gap: 70px;
  margin-bottom: -43px;
  position: relative;
  z-index: 9;
`;

export const Rings = styled.div`
  width: 79px;
  height: 81px;
  background-image: url(${ring});
  background-size: 79px 81px;
`;

interface SketchbookLayoutProps {
  children: React.ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const SketchbookLayout: React.FC<SketchbookLayoutProps> = ({
  children,
  onSubmit,
}) => {
  const [numRings, setNumRings] = useState<number>(0);

  const contentBoxRef = useRef<HTMLFormElement>(null);

  const calculateNumRings = () => {
    if (contentBoxRef.current) {
      const contentBoxWidth = contentBoxRef.current.clientWidth || 0;
      const ringsWidth = 79;
      const ringsSpacing = 70;
      const maxNumRings = 7;
      const calculatedNumRings = Math.floor(
        (contentBoxWidth - ringsSpacing) / (ringsWidth + ringsSpacing)
      );
      setNumRings(Math.min(maxNumRings, calculatedNumRings));
    }
  };

  useEffect(() => {
    calculateNumRings();

    window.addEventListener('resize', calculateNumRings);

    return () => {
      window.removeEventListener('resize', calculateNumRings);
    };
  }, [calculateNumRings]);

  const ringsArray = new Array(numRings).fill(0);

  return (
    <PageWrapper>
      <RingsWrapper>
        {ringsArray.map((_, index) => (
          <Rings key={index} />
        ))}
      </RingsWrapper>
      <ContentBox ref={contentBoxRef} onSubmit={onSubmit}>
        {children}
      </ContentBox>
    </PageWrapper>
  );
};

export default SketchbookLayout;
