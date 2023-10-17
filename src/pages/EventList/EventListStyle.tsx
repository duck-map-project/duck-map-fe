import { styled } from 'styled-components';

import plusIcon from '../../assets/icon-plus.svg';
import px2vw from '../../utils/px2vw';

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${px2vw(142)};
`;

export const ListContentsSection = styled.section`
  width: 100%;
  border-radius: 5px;
  background-color: var(--light-purple);
  margin-top: 34px;
`;

export const MapSection = styled.section`
  width: 100%;
  height: 286px;
  background-color: #ffd0ec;
  padding: 16.5px 23px 24px 24px;
  border: 2px solid #000000;
  border-radius: 20px;
  box-shadow: 6px 6px 0px 0px #00000040;
  position: relative;
  z-index: 9;
`;

export const MapSectionTitle = styled.h2`
  width: 140px;
  padding: 2.5px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.248;
  background-color: #defcf9;
  border: 2px solid #000;
  border-radius: 22px;
  margin: 0 auto 12px;
`;

export const EventAddButton = styled.button`
  width: 162px;
  height: 34px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding-left: 36.5px;
  background-color: var(--yellow);
  border-radius: 30px;
  border: 2px solid #1e232c;
  background-image: url(${plusIcon});
  background-size: 22px;
  background-position: 17px center;
  background-repeat: no-repeat;
  position: absolute;
  top: 12px;
  right: 20px;
`;

export const EventTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 25px 0 35px;
`;

export const ItemListSection = styled.section`
  width: ${px2vw(1104)};
  height: 542px;
  margin: -16px auto 0;
  display: flex;
  background-color: #fffbe2;
  flex-direction: column;
  padding: 38px 60px 26px 20px;
  overflow-y: scroll;
  /* FIXME: 스크롤바 커스텀 */
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    height: 130px;
    background: #8f9ef2;
    border: 1.77px solid #1e232c;
    border-radius: 18px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(176, 180, 204, 0.5);
    border-radius: 18px;
  }
  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:start:increment {
    display: block;
    height: 20px;
  }
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 26px;
  }
`;

export const DotWrapper = styled.section`
  width: 100%;
  height: auto;
  background-color: #f8f8fa;
  border: 2px dashed #1e232c33;
  flex-grow: 1;
  padding: 20px 26px 0;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  width: 100%;
  padding: 10px 0 9px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  background-color: #a6e9ff;
  border: 2px solid #1e232c;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;
