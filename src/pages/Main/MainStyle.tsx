import { styled } from 'styled-components';

import ReviewPreviewIcon from '../../assets/review-preview-icon.svg';
import SortDropdown from '../../components/SortButton';
import { SortDropdownProps } from '../../components/SortButton';
import media from '../../utils/mediaQuery';
import px2vw from '../../utils/px2vw';

export const TextButton = styled.button`
  font-size: 1.6rem;
  cursor: pointer;
`;

export const ProfileDropdown = styled.div`
  position: relative;
`;

export const ProfileImg = styled.img`
  width: ${px2vw(50)};
  height: ${px2vw(50)};
  border-radius: 50%;
  background-color: #000;
  flex-shrink: 0;
`;

export const MainSection = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-end;
  padding: 0 ${px2vw(142)};
  position: relative;
  ${media.mobile`
    padding: 0 27px;
    margin-top: 28px;
    gap: 17px;
  `}
`;

export const MapSortDrop = styled(SortDropdown)<SortDropdownProps>`
  position: absolute;
  right: 39px;
  top: 42px;
  z-index: 9;
  ${media.mobile`
    right: 22px;
    top: 37px;
  `}
`;

export const MapFrame = styled.section`
  position: relative;
  width: 100%;
  padding: 27px 22px 15px 25px;
  border: 2px solid #000000;
  border-radius: 20px;
  background: linear-gradient(0deg, #ffd0ec, #ffd0ec),
    linear-gradient(0deg, #000000, #000000);
  position: relative;
  ${media.mobile`
    padding: 24px 12px 12px;
  `}
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    border: 2px solid #000000;
    border-radius: 20px;
    background-color: #ffc0e6;
    position: absolute;
    top: 0;
    left: 3px;
    z-index: -10;
    transform: rotate(1.3deg);
    ${media.mobile`
    width: 97.91666666666666%;
    height: 98.13333333333333%;
    transform: rotate(1.59deg);
    top: 1.5px;
    left: 10px;
    `}
  }
`;

export const MapTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.248;
  padding: 4.5px 52.5px;
  background-color: #defcf9;
  border: 2px solid #000;
  border-radius: 22px;
  position: absolute;
  top: -17px;
  left: 50%;
  transform: translateX(-50%);
  ${media.mobile`
    padding: 5px 21px;
  `}
`;

export const MapSection = styled.section`
  width: 100%;
  height: 460px;
  background-color: #000;
`;

export const ViewReviews = styled.section`
  overflow: hidden;
  width: 100%;
  /* height: 292px; */
  position: relative;
  background-color: #99edcb;
  padding-top: 11.5px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-image: url(${ReviewPreviewIcon});
  background-repeat: no-repeat;
  background-position: 25px 14px;
  background-size: 20px;
  ${media.mobile`
  background-size: 18px;
  background-position: 12px 6px;
  padding-top: 6.5px;
  border-radius: 5.81px;
  border: 1.4px solid #1e232c;
  `}
`;

export const ViewReviewsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding: 0 0 12.5px 51px;
  ${media.mobile`
  font-size: 1.4rem;
  padding: 0 0 6.5px 31.74px;
  `}
`;

export const MoreButton = styled(TextButton)`
  font-size: 1.6rem;
  font-weight: 700;
  background-color: #defcf9;
  width: 70px;
  height: 28px;
  border-radius: 20px;
  border: 2px solid #000000;
  position: absolute;
  top: 10px;
  right: 19px;
  ${media.mobile`
    width: 46px;
    height: 18px;
    font-size: 1.2rem;
    border: 1.4px solid #000000;
    top: 6px;
    right: 12px;
    box-shadow: 0.8719722628593445px 0.8719722628593445px 0px 0px #00000040;
  `}
`;

export const Reviews = styled.ul`
  display: flex;
  /* height: 241px; */
  align-items: center;
  gap: 19px;
  background-color: #fffbe3;
  border-top: 2px solid #1e232c;
  padding: 15px 20px 20px;
  position: relative;
  ${media.mobile`
    padding: 12px 6px 16px;
    border-top: 1.4px solid #1e232c;
  `}
`;
