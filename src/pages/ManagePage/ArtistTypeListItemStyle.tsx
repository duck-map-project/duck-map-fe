import styled from 'styled-components';

export const ListItem = styled.article`
  position: relative;
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 26px;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #f8f8fa;
`;

export const ItemText = styled.span`
  position: relative;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
  //말줄임
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &::after {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 7.8px;
    top: 22px;
    right: -10px;
    background-color: #ffbcbc;
    opacity: 40%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CommonButton = styled.button`
  display: block;
  position: relative;
  width: 70px;
  height: 36px;
  padding: 3.6px 0px 3px 0px;
  border: 2px solid var(--line-black);
  border-radius: 23.5px;
  background-color: #fffbe3;
  > img {
    position: absolute;
    width: 55px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
