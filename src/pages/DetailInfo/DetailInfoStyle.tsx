import styled from 'styled-components';

import bookmark from '../../assets/bookmark-empty.svg';
import bookmarkActive from '../../assets/bookmark-filled.svg';
import heart from '../../assets/empty-heart.svg';
import heartActive from '../../assets/filled-heart.svg';
import copyIcon from '../../assets/icon-copy.svg';
import mapIcon from '../../assets/map-icon.svg';
import reviewIcon from '../../assets/review-icon.svg';
import smallHeart from '../../assets/small-heart.svg';
import infoIcon from '../../assets/twitter-icon.svg';
import media from '../../utils/mediaQuery';
import px2vw from '../../utils/px2vw';
export const PageWrapper = styled.main`
  padding: 0 ${px2vw(141)} 0 ${px2vw(143)};
  ${media.mobile`
    padding: 0 28px 0 26px;
  `}
`;

export const TopSectionWrapper = styled.section`
  width: 100%;
  background-color: #ffebf5;
  border-radius: 20px;
  border: 2px solid #1e232c;
  justify-content: center;
  position: relative;
  padding: 26px;
  margin-bottom: 65px;
  ${media.mobile`
    padding: 20px 16px;
    margin-bottom: 44px;
  `}
  &::after {
    content: '';
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #ffebf5;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -9;
    ${media.mobile`
      display: none;
    `}
  }
`;

export const TopSection = styled.section`
  width: 100%;
  background-color: #ffd0ec;
  border-radius: 20px;
  border: 2px solid #1e232c;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  gap: 55px;
  padding: 28px 41px 63px 26px;
  ${media.mobile`
    padding: 18px 30px;
    gap: 0;
  `}

  &::after {
    content: '';
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #ffebf5;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -9;
  }
`;

export const ImgSection = styled.section`
  position: relative;
  ${media.mobile`
    margin-bottom: 48px
  `}
`;

export const ImgNumMarkCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--disabled);
  cursor: pointer;
`;

export const HeartButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 34px;
  bottom: -48px;
  ${media.mobile`
    right: 29px;
    bottom: -38px;
  `}
`;

export const LikeNum = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  ${media.mobile`
    font-size: 1.2rem;
  `}
`;

export const HeartButton = styled.button<{ checked: boolean }>`
  width: 24px;
  height: 21px;
  background-image: url(${(props) => (props.checked ? heartActive : heart)});
  background-repeat: no-repeat;
  background-size: contain;
  ${media.mobile`
    width: 18px;
    height: 16px;
  `}
`;

export const BookmarkButton = styled(HeartButton)`
  width: 17px;
  height: 22px;
  position: absolute;
  right: 3px;
  bottom: -28px;
  ${(props) =>
    props.checked
      ? `background-image: url(${bookmarkActive})`
      : `background-image: url(${bookmark})`};
  ${media.mobile`
    width: 12px;
    height: 16px;
    right: 8px;
    bottom: -22px;
  `}
`;

export const InfoSection = styled.section`
  width: 100%;
  max-width: 593px;
  display: flex;
  flex-direction: column;
  align-items: center;
  section {
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      margin-bottom: 12px;
      ${media.mobile`
        margin-bottom: 0;
      `}
    }
  }

  ${media.mobile`
    gap: 6px;
    section {
      &:nth-child(3) {
        order: 1
      }
    }
  `}
`;

export const HeartContour = styled.section`
  display: flex;
  gap: 10px;
  margin: 10px 0 14px;
  ${media.mobile`
    margin: 6px 0;
  `}
`;

export const SmallHeart = styled.div`
  width: 15px;
  height: 12px;
  background-image: url(${smallHeart});
  background-size: 15px 12px;
`;

export const CopyTextBoxWrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 12px;
  ${media.mobile`
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-end;  
  `}
`;

export const CopyButton = styled.button`
  width: 98px;
  height: 46px;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  background-color: #d8caff;
  border: 2px solid #1e232c;
  border-radius: 30px;
  box-shadow: 4px 4px 0px 0px #00000040;
  ${media.mobile`
    font-size: 0;
    width: 68px;
    height: 24px;
    background-image: url(${copyIcon});
    background-repeat: no-repeat;
    background-position: center;  
  `}
`;

export const TabSection = styled.section`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid var(--purple);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  gap: 16px;
  ${media.mobile`
    gap: 3.62px;
  `}
`;

export const TabButton = styled.button<{
  $currentTab?: string;
  $tabType: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 53px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  background-color: #fff3ac;
  border: 2px solid #1e232c;
  border-radius: 0 0 20px 20px;
  box-shadow: 4px 4px 0px 0px #00000040;
  background-repeat: no-repeat;
  background-position: 14px calc(100% - 14px);
  text-align: right;
  padding-right: 20px;
  cursor: pointer;
  ${media.mobile`
    height: 35px;
    font-size: 1.6rem;
    background-position: 7.88px calc(100% - 10px);
    background-size: 24px 20px;
    padding-bottom: 10px;
  `}
`;

// TODO: 좀 더 간단하게 리펙토링
export const InfoButton = styled(TabButton)`
  width: 127px;
  height: ${(props) => (props.$currentTab === 'info' ? '79px' : '')};
  background-image: url(${infoIcon});
  ${media.mobile`
    width: 77.75px;
    padding-right: 7.88px;
    height: ${(props) => (props.$currentTab === 'info' ? '51px' : '')};
  `}
`;

export const MapButton = styled(TabButton)`
  width: 133px;
  background-image: url(${mapIcon});
  height: ${(props) => (props.$currentTab === 'map' ? '79px' : '')};
  ${media.mobile`
    width: 83.18px;
    padding-right: 8.09px;
    height: ${(props) => (props.$currentTab === 'map' ? '51px' : '')};
  `}
`;

export const ReviewButton = styled(TabButton)`
  width: 155px;
  height: ${(props) => (props.$currentTab === 'review' ? '79px' : '')};
  background-image: url(${infoIcon});
  background-image: url(${reviewIcon});
  ${media.mobile`
    width: 95.84px;
    padding-right: 7.42px;
    height: ${(props) => (props.$currentTab === 'review' ? '51px' : '')};
  `}
`;

export const DetailContents = styled.section`
  width: 100%;
  background-color: #fffbe2;
  border: 2px solid #1e232c;
  border-radius: 20px;
  padding: 30px 26px 31px 26px;
  position: relative;
  ${media.mobile`
    padding: 20px 16px;
  `}

  &::after {
    display: block;
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #fffbe2;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 11px;
    left: 10px;
    z-index: -9;
    ${media.mobile`
      display: none;
    `}
  }
`;

export const AddReviewButton = styled.button`
  display: block;
  width: 190px;
  height: 40px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  margin: 25px 0 20px auto;
  background-color: #defcf9;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

export const StoreAndRatingWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
