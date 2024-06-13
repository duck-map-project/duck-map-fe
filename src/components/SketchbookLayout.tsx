import { FormEvent, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';

import ring from '../assets/ring.svg';
import media from '../utils/mediaQuery';
import px2vw from '../utils/px2vw';

export const PageWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px ${px2vw(142)} 0 ${px2vw(144)};
  ${media.mobile`
    padding: 33.86px 27px 0;
  `}
`;

const felxCol = css`
  flex-direction: column;
  align-items: center;
`;

const flexRow = css`
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContentBox = styled.form<{ flex: string }>`
  width: 100%;
  display: flex;
  ${(props) => (props.flex === 'col' ? felxCol : flexRow)}
  background-color: #fffbe2;
  padding: 81px ${px2vw(49)} 24px ${px2vw(45)};
  border: 2px solid #1e232c;
  border-radius: 20px;
  position: relative;
  gap: 42px;
  ${media.mobile`
    padding: 14px 16px;
    gap: 17px;
  `}
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
    ${media.mobile`
      display: none;
    `}
  }
`;

export const RingsWrapper = styled.section`
  display: flex;
  gap: 70px;
  margin-bottom: -43px;
  position: relative;
  z-index: 9;
  ${media.mobile`
    display: none;
  `}
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
  flex: 'col' | 'row';
  // TODO: 리뷰작성 페이지 완료하고 나면 옵셔널 지우기
  containerRef?: React.RefObject<HTMLDivElement>;
}

const SketchbookLayout: React.FC<SketchbookLayoutProps> = ({
  children,
  onSubmit,
  flex,
  containerRef,
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
    <PageWrapper ref={containerRef}>
      <RingsWrapper>
        {ringsArray.map((_, index) => (
          <Rings key={index} />
        ))}
      </RingsWrapper>
      <ContentBox ref={contentBoxRef} onSubmit={onSubmit} flex={flex}>
        {children}
      </ContentBox>
    </PageWrapper>
  );
};

export default SketchbookLayout;
