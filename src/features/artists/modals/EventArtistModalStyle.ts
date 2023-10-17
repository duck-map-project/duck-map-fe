import { css, styled } from 'styled-components';

import searchIcon from '../../../assets/color-search-icon.svg';
import leftArrow from '../../../assets/left-arrow.svg';

export const Wrapper = styled.section`
  display: flex;
  width: 100%;
  padding-top: 28px;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding: 2.5px 0 2.5px 40px;
  position: relative;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  margin-bottom: 14px;
`;

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CurrentArtist = styled.img`
  width: 210px;
  height: 210px;
  border: 2px solid #1e232c;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  background-color: #d9d9d9;
`;

export const TextBox = styled.p`
  width: 210px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  padding: 14px 0;
  text-align: center;
  background-color: #d4f4ff;
  border: 2px solid #1e232c;
  border-radius: 30px;
  margin-bottom: 10px;
`;

const pseudoElementStlye = css`
  content: '';
  display: block;
  width: 2px;
  height: 14px;
  border: 2px solid #1e232c;
  background-color: #defcf9;
  position: absolute;
  top: -14px;
  z-index: -9;
`;

export const ArtistNameText = styled(TextBox)`
  font-size: 1.6rem;
  height: 59px;
  background-color: #ecf5f8;
  margin-bottom: 17px;
  position: relative;
  &::before {
    ${pseudoElementStlye}
    left: 54px;
  }
  &::after {
    ${pseudoElementStlye}
    right: 54px;
  }
`;

export const ArtistTypeWrapper = styled.section`
  width: 210px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ArtistTypeButton = styled.button`
  height: 40px;
  padding: 0 15px;
  background-color: #eff2f3;
  border: 2px solid #1e232c;
  border-radius: 20px;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

export const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const SubmitButton = styled.button`
  width: 213px;
  height: 62px;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  background-color: #defcf9;
  border: 2.94px solid #1e232c;
  border-radius: 73px;
  box-shadow: 4.405120372772217px 4.405120372772217px 0px 0px #00000040;
`;

export const PrevButton = styled(SubmitButton)`
  background-color: #f8f8fa;
  border: 2px solid #1e232c;
  background-image: url(${leftArrow});
  background-repeat: no-repeat;
  background-position: 39px center;
  padding-left: 26px;
  margin-bottom: 14px;
`;

export const RightSection = styled.section`
  width: 100%;
`;

export const GroupSelectSection = styled.section`
  width: 100%;
  max-width: 872px;
  height: 630px;
  padding-top: 14px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-color: #ffd0ec;
  overflow: hidden;
  padding-top: 14px;
`;

export const ArtistListWrapper = styled.section`
  width: 100%;
  height: 558px;
  padding: 18px 22px 18px 20px;
  background-color: #e6f8fe;
  border-top: 2px solid #1e232c;
  border-bottom: 2px solid #1e232c;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 22px;
  }
  &::-webkit-scrollbar-thumb {
    height: 70px;
    background: #ffd0ec;
    border: 4px solid #fff4fb;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #fff4fb;
    border-left: 2px solid #1e232c;
  }
`;

export const ArtistListSection = styled.ul`
  width: 100%;
  gap: 20px 18px;
  display: flex;
  flex-wrap: wrap;
`;
