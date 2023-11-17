import { Link } from 'react-router-dom';
import styled from 'styled-components';

import heart from '../../../assets/heart.svg';
import heartmobile from '../../../assets/heart3.svg';
import media from '../../../utils/mediaQuery';

type ListLabelProps = {
  selected: boolean;
};

export const SideBarSection = styled.section`
  position: relative;
  width: 231px;
  height: 387px;
  padding: 67px 44px 53px;
  background-color: #fffbe2;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 31px;
    top: 0;
    left: 0;
    background-color: #ffd0ec;
    border-bottom: 2px solid var(--line-black);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    ${media.mobile`
    height: 22px;
    `}
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #f6edb2;
    border: 2px solid var(--line-black);
    border-radius: 20px;
    top: 5px;
    right: -10px;
    z-index: -9;
    ${media.mobile`
    display: none;
    `}
  }
  ${media.mobile`
    width: 100%;
    height: 82px;
    padding: 35px 18px 10px;
    margin-top: 20px;
  `}
`;

export const SpringWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 12px;
  top: -13px;
  right: 50%;
  transform: translateX(50%);
  ${media.mobile`
    gap: 20px;
  `}
`;

export const Spring = styled.div`
  width: 8px;
  height: 24px;
  border: 2px solid var(--line-black);
  border-radius: 6px;
  background-color: #defcf9;
`;

export const ListsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  ${media.mobile`
  flex-direction: row;   
  align-items: center;
    width: 100%;
    gap: 10px;
  `}
`;

export const List = styled.div`
  margin-bottom: 15px;
  ${media.mobile`
  width: 45px;
  margin-bottom: 0;
  text-align: center;
  word-break: keep-all;
  `}
`;

export const ListLink = styled(Link)<ListLabelProps>`
  position: relative;
  font-size: 24px;
  font-weight: 700;
  color: var(--font-black);
  ${(props) =>
    props.selected &&
    `color: #9859B4;
    &::before {
      position: absolute;
      display: block;
      content: url(${heart});
      width: 12px;
      height: 12px;
      top:  -2px;
      left: -20px;
    }
  `}

  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 6px;
    opacity: 0.4;
    background-color: #dcd294;
    bottom: 3px;
    left: 5px;
    border-radius: 5px;
    ${media.mobile`
    display: none;
    `}
  }

  ${media.mobile`
  display: block;
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  `}
  ${(props) =>
    props.selected &&
    media.mobile`
    &::before {
      position: absolute;
      display: block;
      content: url(${heartmobile});
      width: 12px;
      height: 12px;
      top: 10%;
      left: 50%;
      transform: translateX(-80%);
      opacity: 0.8;
    }
  `}
`;
