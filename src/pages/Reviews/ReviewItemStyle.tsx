import styled from 'styled-components';

export const ReviewItemWrapper = styled.article`
  position: relative;
  width: 338px;
  height: 312px;
  padding: 0;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #f8f8fa;
`;

export const ArtistsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  margin: 0 14px 10px;
`;

export const EventName = styled.span`
  display: block;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;

export const ArtistName = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;

export const NumberOfAritsts = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
`;

export const CategoryWrapper = styled.div`
  margin: 0 14px;
`;

export const Category = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: rgba(30, 35, 44, 0.5);
  margin: 0 7px 12px 0;
`;

export const ReviewImgWrapper = styled.div`
  padding: 14px 14px 8px 14px;
`;

export const ReviewImg = styled.img`
  width: 100%;
  height: 190px;
  border: 2px solid var(--line-black);
  object-fit: cover;
`;

export const RatingWrapper = styled.div`
  position: absolute;
  left: -2px;
  bottom: -2px;
  background-color: #fffced;
  width: 338px;
  height: 28px;
  border: 2px solid var(--line-black);
  border-radius: 0 0 20px 20px;
`;
