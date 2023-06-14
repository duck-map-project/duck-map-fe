import { styled } from 'styled-components';

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
  gap: ${px2vw(22)};
  align-items: flex-end;
`;

export const MapSection = styled.section`
  width: 100%;
  height: 496px;
  background-color: #000;
  margin-bottom: ${px2vw(17)};
`;

export const ViewReviews = styled.section`
  overflow: hidden;
  position: relative;
  padding-top: 19px;
`;

export const MoreButton = styled(TextButton)`
  position: absolute;
  top: 0;
  right: ${px2vw(10)};
`;

export const Reviews = styled.section`
  display: flex;
`;

export const ReviewsItem = styled.div<{ image: string }>`
  width: 392px;
  height: 248px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  flex-shrink: 0;
  margin-right: ${px2vw(8)};
  &:last-child {
    margin-right: 0;
  }
`;
