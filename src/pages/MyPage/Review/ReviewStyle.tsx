import styled from 'styled-components';

import deleteicon from '../../../assets/delete.svg';
import editicon from '../../../assets/edit.svg';
import media from '../../../utils/mediaQuery';

export const ReviewItemWrapper = styled.article`
  width: 390px;
  padding: 18px 0 8px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #f8f8fa;
  cursor: pointer;
  ${media.mobile`
    width: 100%;
    padding: 16px 0 11px;
  `}
`;

export const ReviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0 22px 25px;
  ${media.mobile`
    gap: 10px;
    margin-bottom: 10px;
  `}
`;

export const EventName = styled.span`
  display: block;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal
  `}
`;

export const ReviewContent = styled.section`
  display: -webkit-box;
  height: 60px;
  margin: 0 22px 17px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  //말줄임
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  ${media.mobile`
    height: 54px;
    margin :  0 16px 14px;
    line-height: 18px;
  `}
`;

export const ReviewImg = styled.img`
  width: 100%;
  height: 263px;
  border-top: 2px solid var(--line-black);
  border-bottom: 2px solid var(--line-black);
  object-fit: cover;
  margin-bottom: 8px;
  ${media.mobile`
    height: 158px;
  margin-bottom: 10px;
  `}
`;

export const ReviewsWrapper = styled.div`
  display: grid;
  gap: 18px 16px;
  grid-template-columns: repeat(2, 1fr);
  ${media.mobile`
  grid-template-columns: repeat(1, 1fr);
  padding-right: 14px;
  `}
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;
  padding-right: 16px;
  margin-left: auto;
`;

const Button = styled.button.attrs({ type: 'button' })`
  width: 100px;
  height: 28px;
  background-color: #fff3ac;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-position: 0 center;
  ${media.mobile`
    width: 42px;
    height: 24px;
  `}
`;

export const EditButton = styled(Button)`
  padding-left: 20px;
  background-image: url(${editicon});
  ${media.mobile`
    background-size: 40px 32px;
  `}
`;

export const DeleteButton = styled(Button)`
  padding-left: 22px;
  background-image: url(${deleteicon});
  ${media.mobile`
    background-size: 40px 30px;
  `}
`;

export const ButtonText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.247857142857143;
  color: #1e232c;
  ${media.mobile`
    display: none;
  `}
`;
