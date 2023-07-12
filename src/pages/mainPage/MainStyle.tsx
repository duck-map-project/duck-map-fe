import { styled } from 'styled-components';

import ReviewPreviewIcon from '../../assets/review-preview-icon.svg';
import SortDropdown from '../../components/SortButton';
import { SortDropdownProps } from '../../components/SortButton';
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
`;

export const MapSortDrop = styled(SortDropdown)<SortDropdownProps>`
  position: absolute;
  right: 40px;
  top: 40px;
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
  &::after {
    content: '';
    width: 100%;
    height: 502px;
    border: 2px solid #000000;
    border-radius: 20px;
    background-color: #ffc0e6;
    position: absolute;
    top: 0;
    left: 3px;
    z-index: -10;
    transform: rotate(1.3deg);
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
`;

export const MapSection = styled.section`
  width: 100%;
  height: 460px;
  background-color: #000;
`;

export const ViewReviews = styled.section`
  overflow: hidden;
  width: 100%;
  height: 292px;
  position: relative;
  background-color: #99edcb;
  padding-top: 11.5px;
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-image: url(${ReviewPreviewIcon});
  background-repeat: no-repeat;
  background-position: 25px 14px;
  background-size: 20px;
`;

export const ViewReviewsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding: 0 0 12.5px 51px;
`;

export const MoreButton = styled(TextButton)`
  font-size: 1.6rem;
  font-weight: 700;
  background-color: #defcf9;
  width: 70px;
  height: 28px;
  border-radius: 20px;
  border: 2px solid #000000;
  box-shadow: 3px 3px 0px 0px #00000040;
  position: absolute;
  top: 10px;
  right: 19px;
`;

export const Reviews = styled.ul`
  display: flex;
  height: 241px;
  align-items: center;
  gap: 19px;
  background-color: #fffbe3;
  border-top: 2px solid #1e232c;
  padding: 0 20px;
  position: relative;
`;
