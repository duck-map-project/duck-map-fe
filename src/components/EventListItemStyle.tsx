import { styled } from 'styled-components';

import bookmark from '../assets/bookmark-empty.svg';
import bookmarkActive from '../assets/bookmark-filled.svg';
import heart from '../assets/empty-heart.svg';
import heartActive from '../assets/filled-heart.svg';

export const EventListItemBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  background-color: #e6f8fe;
  border: 2px solid #1e232c;
  border-radius: 10px;
  padding: 18.6px 0 11.4px 20px;
  background-color: #e6f8fe;
  cursor: pointer;
  position: relative;
`;

export const EventInfoBox = styled.div`
  display: flex;
`;

export const EventImage = styled.img`
  width: 124px;
  height: 124px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  margin-right: 10px;
`;

export const EventTextSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const NameSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 7.6px;
`;

export const StrongTxt = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
`;

export const GroupName = styled(StrongTxt)`
  margin-right: 12px;
`;

export const StoreName = styled(StrongTxt)`
  margin-bottom: 8px;
`;

export const RegularTxt = styled.span`
  display: block;
  font-size: 1.4rem;
  line-height: 1.247857142857143;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: rgba(255, 251, 227, 0.98);
  border: 2px solid #1e232c;
  border-radius: 40px;
  box-shadow: 4px 4px 0px 0px #00000040;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 12px;
`;

export const LikeButton = styled(IconButton)<{ isLike: boolean }>`
  background-size: 20px 16px;
  background-image: url(${(props) => (props.isLike ? heartActive : heart)});
  right: 64px;
`;

export const BookmarkButton = styled(IconButton)<{ isBookmarked: boolean }>`
  background-size: 12px 16px;
  background-image: ${(props) =>
    props.isBookmarked ? `url(${bookmarkActive})` : `url(${bookmark})`};
  right: 20px;
`;

export const SeeMoreButton = styled.button`
  width: 123px;
  height: 28px;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
  background-color: #fffdc7;
  border: 2px solid #1e232c;
  border-radius: 30px;
  box-shadow: 4px 4px 0px 0px #00000040;
  position: absolute;
  bottom: 14px;
  right: 18px;
`;
