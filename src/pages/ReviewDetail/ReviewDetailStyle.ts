import { styled } from 'styled-components';

import heartSticker from '../../assets/heart-sticker.svg';
import tape from '../../assets/tape.svg';

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 490px;
  margin-right: 42px;
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 100%;
  height: 546px;
  align-items: center;
  background-color: #f8f8fa;
  border: 2px solid #1e232c;
  border-radius: 20px;
  padding: 26px 0 19px;
  position: relative;
  margin-bottom: 11.36px;
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
  }
`;
const HeartSticker = styled.div`
  width: 42.65px;
  height: 37.73px;
  background-image: url(${heartSticker});
  position: absolute;
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
`;

export const RightSection = styled.section`
  width: 46.27%;
  min-width: 534px;
  display: flex;
  flex-direction: column;
`;

export const InfoSection = styled.section`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

export const UserProfile = styled.img`
  width: 66px;
  height: 66px;
  border: 1.4px solid #1e232c;
  border-radius: 50%;
`;

const TextBox = styled.p`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #1e232c;
  border-radius: 50px;
`;

export const UserText = styled(TextBox)`
  width: 164px;
  background-color: #f8f8fa;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
`;

export const StoreName = styled(TextBox)`
  width: 284px;
  background-color: #ffebf4;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
`;

export const HashTagSection = styled.section`
  display: flex;
  gap: 8px;
  margin-bottom: 25px;
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
`;

export const ReviewText = styled.p`
  width: 100%;
  height: 100%;
  border: 2px solid #1e232c;
  border-radius: 20px;
  color: #1e232c;
  background-color: #f8f8fa;
  padding: 26px 16px;
  position: relative;
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
  }
`;
