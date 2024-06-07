import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import leftTriangle from '../../assets/left-triangle.svg';
import rightTriangle from '../../assets/right-triangle.svg';
import whiteLeftArrow from '../../assets/white-left-arrow.svg';
import whiteRightArrow from '../../assets/white-right-arrow.svg';
import media from '../../utils/mediaQuery';

const SliderSection = styled.section`
  position: relative;
`;

const primarySize = css`
  max-width: 400px;
  max-height: 357px;
  width: 100%;
  height: 100%;
  aspect-ratio: 400 / 357;
  ${media.mobile`
    max-width: 244px;
    max-height: 180px;
    aspect-ratio: 244/ 180;
  `}
`;

const reviewSize = css`
  width: 438px;
  height: 410px;
`;

const SliderContainer = styled.div<{ type: 'review' | 'primary' }>`
  ${(props) => (props.type === 'review' ? reviewSize : primarySize)}
  border: 2px solid #1e232c;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  border-radius: ${(props) => (props.type === 'review' ? '20px' : '')};
`;

const SliderTrack = styled.div<{
  transform: number;
  itemWidth: number;
}>`
  display: flex;
  position: relative;
  transition: transform 0.3s ease;
  transform: translateX(-${(props) => props.transform * props.itemWidth}px);
`;

const Slide = styled.img<{ type: 'review' | 'primary' }>`
  flex-shrink: 0;
  ${(props) => (props.type === 'review' ? reviewSize : primarySize)}
`;

const SlideButton = styled.button`
  width: 12px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const LeftSlideButton = styled(SlideButton)`
  background-image: url(${leftTriangle});
  left: -20px;
`;

const RightSlideButton = styled(SlideButton)`
  background-image: url(${rightTriangle});
  right: -20px;
`;

const ReviewSlideButton = styled.button`
  width: 10px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  bottom: 11px;
`;

const ReviewRightButton = styled(ReviewSlideButton)`
  background-image: url(${whiteRightArrow});
  right: 16px;
`;

const ReviewLeftButton = styled(ReviewSlideButton)`
  background-image: url(${whiteLeftArrow});
  left: 16px;
`;

const DotContainer = styled.div<{ type: 'review' | 'primary' }>`
  display: flex;
  justify-content: center;
  gap: ${(props) => (props.type === 'review' ? '19.25px' : '14px')};
  margin-top: 8px;
  position: absolute;
  bottom: ${(props) => (props.type === 'primary' ? '13px' : '-31.39px')};
  left: 50%;
  transform: translateX(-50%);
`;

const primary = css`
  width: 8px;
  height: 8px;
`;

const reviewDot = css`
  width: 14px;
  height: 14px;
  border: 2px solid #1e232c;
`;

const Dot = styled.div<{ $active: boolean; type: 'review' | 'primary' }>`
  ${(props) => (props.type === 'review' ? reviewDot : primary)}
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? '#FE83AF' : '#F8F8FA')};
`;

interface ImageSliderProps {
  images: string[];
  type?: 'review' | 'primary';
  itemWidth: number;
  primaryRef: React.RefObject<HTMLDivElement>;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  type = 'primary',
  itemWidth,
  primaryRef,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <SliderSection>
      <SliderContainer ref={type === 'primary' ? primaryRef : null} type={type}>
        <SliderTrack transform={currentSlide} itemWidth={itemWidth}>
          {images.map((image, index) => (
            <Slide
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              type={type}
            />
          ))}
        </SliderTrack>
        {type === 'primary' ? (
          <DotContainer type={type}>
            {images.map((_, index) => (
              <Dot key={index} $active={index === currentSlide} type={type} />
            ))}
          </DotContainer>
        ) : null}
        {type === 'review' ? (
          <>
            <ReviewLeftButton type="button" onClick={prevSlide} />
            <ReviewRightButton type="button" onClick={nextSlide} />
          </>
        ) : null}
      </SliderContainer>
      {type === 'review' ? (
        <DotContainer type={type}>
          {images.map((_, index) => (
            <Dot key={index} $active={index === currentSlide} type={type} />
          ))}
        </DotContainer>
      ) : null}
      {type === 'primary' && itemWidth >= 220 ? (
        <>
          <LeftSlideButton type="button" onClick={prevSlide} />
          <RightSlideButton type="button" onClick={nextSlide} />
        </>
      ) : null}
    </SliderSection>
  );
};

export default ImageSlider;
