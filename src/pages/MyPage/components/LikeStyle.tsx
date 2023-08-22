import styled from 'styled-components';

import heartIcon from '../../../assets/icons/heart-big.svg';
import media from '../../../utils/mediaQuery';

type LikeWrapperProps = {
  icon: string;
};

export const LikeContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const LikeWrapper = styled.article<LikeWrapperProps>`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 14px;
  width: 96%;
  padding: 11px 20px;
  margin-top: 38px;
  margin-right: 34px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #f8f8fa;
  box-sizing: border-box;
  cursor: pointer;
  &:first-of-type {
    margin-top: 22px;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 28px;
    height: 22px;
    top: -26px;
    padding: 12px;
    border: 2px solid var(--line-black);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #d7f5ff;
    background-image: url(${heartIcon});
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    z-index: -1;
    ${media.mobile`
      left: 18px;
    `}
  }
  ${media.mobile`
    flex-direction: column;
    gap: 6px;
    height: 214px;
    padding: 0;
  `}
`;

export const EventImg = styled.img`
  width: 124px;
  height: 124px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  object-fit: cover;
  ${media.mobile`
    width: 101.5%;
    height: 90px;
    position: relative;
    top: -3px;
  `}
`;

export const InfoSection = styled.section`
  ${media.mobile`
    width: 100%;
    padding: 0 12px;
  `}
`;

export const ArtistInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 7.6px;
  ${media.mobile`
  margin-bottom: 6px;
  `}
`;

export const ArtistName = styled.span`
  font-size: 16px;
  font-weight: 700;
  margin-right: 5px;
`;

export const EventTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  ${media.mobile`
  `}
`;

export const TypeInfoBtn = styled.span`
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  border: 2px solid #a0a0a0;
  border-radius: 30px;
  background-color: #f5edff;
  ${media.mobile`
  padding: 3px 14px;
    font-size: 10px;
  `}
`;

export const StoreName = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    font-size: 14px;
    margin-bottom: 7px;
  `}
`;

export const Adress = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    font-size: 14px;
  `}
`;
