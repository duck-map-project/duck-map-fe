import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import leftTriangle from '../../assets/left-triangle.svg';
import rightTriangle from '../../assets/right-triangle.svg';
import whiteLeftArrow from '../../assets/white-left-arrow.svg';
import whiteRightArrow from '../../assets/white-right-arrow.svg';

const SliderSection = styled.section`
  position: relative;
`;

const primarySize = css`
  width: 400px;
  height: 357px;
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
  position: ${(props) => (props.type === 'review' ? 'relative' : '')};
`;

const SliderTrack = styled.div<{
  transform: number;
  type: 'review' | 'primary';
}>`
  display: flex;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.type === 'review'
      ? `translateX(-${props.transform * 438}px)`
      : `translateX(-${props.transform * 400}px)`};
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
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  type = 'primary',
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
      <SliderContainer type={type}>
        <SliderTrack transform={currentSlide} type={type}>
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
      {type === 'primary' ? (
        <>
          <LeftSlideButton type="button" onClick={prevSlide} />
          <RightSlideButton type="button" onClick={nextSlide} />
        </>
      ) : null}
    </SliderSection>
  );
};

export default ImageSlider;
