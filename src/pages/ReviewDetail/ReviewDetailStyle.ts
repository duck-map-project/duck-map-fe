import { styled } from 'styled-components';

import heartSticker from '../../assets/heart-sticker.svg';
import buttonIcon from '../../assets/icon-button-arrow.svg';
import tape from '../../assets/tape.svg';
import media from '../../utils/mediaQuery';

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 490px;
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 100%;
  align-items: center;
  background-color: #f8f8fa;
  border: 2px solid #1e232c;
  border-radius: 20px;
  padding: 26px 0 19px;
  position: relative;
  margin-bottom: 11.36px;
  ${media.mobile`
    margin-bottom: 0;
    padding: 16px 0 17px;
    gap: 29px;
  `}
  &::after {
    content: '';
    display: block;
    width: 98.1px;
    height: 39.91px;
    background-image: url(${tape});
    background-size: 94px 30px;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: -21.46px;
    left: 50%;
    transform: translateX(-50%) rotate(6deg);
    ${media.mobile`
      width: 51.45px;
      height: 22.64px;
      background-size: 50.08px 18.46px;
      transform: translateX(-50%) rotate(4.87deg);
      top: -10px;
    `}
  }
`;
const HeartSticker = styled.div`
  width: 42.65px;
  height: 37.73px;
  background-image: url(${heartSticker});
  position: absolute;
  ${media.mobile`
    display: none;
  `}
`;

export const LeftHeart = styled(HeartSticker)`
  left: -17px;
  bottom: 54.88px;
`;

export const RightHeart = styled(HeartSticker)`
  right: -21.65px;
  top: 200px;
`;

export const CircleSticker = styled.div`
  width: 23px;
  height: 23px;
  background-color: #cbb8ff;
  border-radius: 50%;
  border: 2px solid #1e232c;
  position: absolute;
  bottom: 85.61px;
  right: -11px;
  ${media.mobile`
    display: none;
  `}
`;

export const GoToEventButton = styled.button.attrs({ type: 'button' })`
  width: 100%;
  height: 70px;
  background-color: #cafffa;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 4px 4px 0px 0px #00000040;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  ${media.mobile`
    width: 85.53%;
    height: 58px;
    flex-shrink: 0;
    font-size: 2rem;
    margin : 0 auto;
  `}
`;

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97.55%;
  height: 82.86%;
  background-color: #f0fffe;
  color: #1e232c;
  border: 2px solid #1e232c;
  border-radius: 50px;
  margin: 0 auto;
  background-image: url(${buttonIcon});
  background-repeat: no-repeat;
  background-position: right 14.04% center;
  ${media.mobile`
    
  `}
`;

export const RightSection = styled.section`
  width: 100%;
  max-width: 534px;
  display: flex;
  flex-direction: column;
`;

export const InfoSection = styled.section`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  ${media.mobile`
    gap: 8px;
  `}
`;

export const UserProfile = styled.img`
  width: 66px;
  aspect-ratio: 1/1;
  border: 1.4px solid #1e232c;
  border-radius: 50%;
  ${media.mobile`
    width: 36px;
    height: 36px;
  `}
`;

const TextBox = styled.p`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #1e232c;
  border-radius: 50px;
  ${media.mobile`
    height: 36px;
  `}
`;

export const UserText = styled(TextBox)`
  max-width: 164px;
  background-color: #f8f8fa;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  ${media.mobile`
    font-size: 1.6rem;
  `}
`;

export const StoreName = styled(TextBox)`
  max-width: 284px;
  background-color: #ffebf4;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  ${media.mobile`
    font-size: 1.4rem;
  `}
`;

export const HashTagSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
  ${media.mobile`
    font-size: 1.2rem;
    gap: 6px;
    margin-bottom: 17px;
  `}
`;

export const HashTag = styled.p`
  color: #1e232cb2;
  background-color: #f9f1ff;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.247857142857143;
  padding: 9.5px 17px;
  border: 2px solid #1e232cb2;
  border-radius: 30px;
  word-break: break-all;
  ${media.mobile`
    padding: 6.5px 12px;
  `}
`;

export const ReviewSection = styled.section`
  width: 100%;
  height: 100%;
  border: 2px solid #1e232c;
  border-radius: 20px;
  color: #1e232c;
  background-color: #f8f8fa;
  padding: 26px 16px;
  position: relative;
  ${media.mobile`
    height: 184px;
    font-size: 1.4rem;
    margin-bottom: 7px;
    padding: 14px 12px;
  `}
  &::after {
    content: '';
    display: block;
    width: 76.71px;
    height: 28.83px;
    background-image: url(${tape});
    background-size: 76.71px 28.83px;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%) rotate(-1.23deg);
    ${media.mobile`
      width: 42px;
      height: 18px;
      background-size: contain;
      transform: translateX(-50%) rotate(1.23deg);
      top: -8.55px;
    `}
  }
`;

export const ReviewText = styled.p`
  height: 100%;
  word-break: break-all;
  ${media.mobile`
    overflow-y: scroll;
    width: 100%; 
    &::-webkit-scrollbar-thumb {
      position: relative;
      background-color: #8f9ef2;
      border: 2px solid var(--line-black);
      border-radius: 17.7px;
  }
    &::-webkit-scrollbar {
      width: 8px;
  }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      border: 2px solid transparent;
      background-clip: content-box;
      background-color: rgba(176, 180, 204, 0.5);
  }
  `}
`;
