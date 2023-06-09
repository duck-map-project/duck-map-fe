import { styled } from 'styled-components';

import plusIcon from '../../assets/plus-white.svg';
import px2vw from '../../utils/px2vw';

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${px2vw(65)};
`;

export const ListContentsSection = styled.section`
  width: 100%;
  padding: 22px 17px;
  border-radius: 5px;
  background-color: var(--light-purple);
  margin-top: 49px;
`;

export const MapSection = styled.section`
  width: 100%;
  height: 252px;
  background-color: var(--disabled);
  position: relative;
`;

export const EventAddButton = styled.button`
  width: 50px;
  height: 50px;
  background-image: url(${plusIcon});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 15px;
  right: 18px;
`;

export const EventTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 25px 0 35px;
`;

export const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > li {
    margin-bottom: 10px;
  }

  & > li:last-child {
    margin-bottom: 0;
  }
`;
