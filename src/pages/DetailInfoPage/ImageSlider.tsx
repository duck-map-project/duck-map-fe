import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 416px;
  height: 357px;
  border: 2px solid #1e232c;
  overflow: hidden;
  position: relative;
`;

const SliderTrack = styled.div<{ transform: number }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${(props) => `translateX(-${props.transform * 416}px)`};
`;

const Slide = styled.img`
  flex-shrink: 0;
  width: 416px;
  height: 357px;
`;

const SlideButton = styled.button`
  padding: 30px 10px;
  background-color: #d8caff;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const LeftSlideButton = styled(SlideButton)`
  left: 0;
  border-radius: 0 50% 50% 0;
`;

const RightSlideButton = styled(SlideButton)`
  right: 0;
  border-radius: 50% 0 0 50%;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  position: absolute;
  bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 4px;
  background-color: ${(props) => (props.active ? '#FE83AF' : '#F8F8FA')};
`;

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
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

  useEffect(() => {
    if (images && images.length > 0) {
      const slideInterval = setInterval(nextSlide, 3000);
      return () => clearInterval(slideInterval);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <SliderContainer>
      <SliderTrack transform={currentSlide}>
        {images.map((image, index) => (
          <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </SliderTrack>
      <LeftSlideButton onClick={prevSlide}>Prev</LeftSlideButton>
      <RightSlideButton onClick={nextSlide}>Next</RightSlideButton>
      <DotContainer>
        {images.map((_, index) => (
          <Dot key={index} active={index === currentSlide} />
        ))}
      </DotContainer>
    </SliderContainer>
  );
};

export default ImageSlider;
