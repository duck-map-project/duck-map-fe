import styled from 'styled-components';

export const ReviewItemWrapper = styled.article`
  width: 390px;
  height: 468px;
  padding: 18px 0;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #f8f8fa;
`;

export const ReviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0 22px 25px;
`;

export const EventName = styled.span`
  display: block;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;

export const ReviewContent = styled.section`
  display: -webkit-box;
  margin: 0 22px 17px;
  height: 60px;
  //말줄임
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 20px;
`;

export const ReviewImg = styled.img`
  width: 100%;
  height: 263px;
  border-top: 2px solid var(--line-black);
  border-bottom: 2px solid var(--line-black);
`;
