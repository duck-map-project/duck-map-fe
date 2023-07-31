import { css, styled } from 'styled-components';

import artistDefaultImage from '../../assets/artist-default-image.svg';
import closeIcon from '../../assets/close.svg';
import magnifierIcon from '../../assets/magnifier.svg';

export const AritstSelectSection = styled.section`
  width: 872px;
  padding: 14px 0 32px;
  background-color: #ffd0ec;
  border: 2px solid #1e232c;
  border-radius: 20px;
`;

const SearchBar = styled.section`
  display: flex;
  align-items: center;
  max-width: 831px;
  width: 95.3%;
  margin: 0 auto 14px;
  border: 2px solid #1e232c;
  border-radius: 30px;
  background-color: #f8f8fa;
  padding: 12px 14px 12px 46px;
  background-image: url(${magnifierIcon});
  background-repeat: no-repeat;
  background-position: 14px center;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.248125;
`;

const CancelButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${closeIcon});
  background-size: 20px;
`;

export const ArtistSearchInput = () => {
  return (
    <SearchBar>
      <SearchInput placeholder="아티스트 검색" type="text" />
      <CancelButton />
    </SearchBar>
  );
};

export const ArtistListSection = styled.ul`
  width: 100%;
  height: 286px;
  display: flex;
  flex-wrap: wrap;
  padding: 18px 22px 18px 20px;
  gap: 20px 18px;
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

const primaryBackground = css`
  background-image: url(${artistDefaultImage});
  background-position: center;
`;

const isImageBackground = css<{ image: string }>`
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
`;

const selectedListStyle = css`
  position: relative;
  box-shadow: 0px 0px 0px 4px #ffd0ec;
`;
export const ArtistListItem = styled.li<{
  image: string;
  selectedIds: number[];
  currentId: number;
}>`
  width: 118px;
  height: 118px;
  border: 3.37px solid #1e232c;
  background-color: #f8f8fa;
  background-repeat: no-repeat;
  cursor: pointer;
  ${(props) =>
    props.image === '/images/null' ? primaryBackground : isImageBackground}
  border-radius: 50%;
  ${(props) =>
    props.selectedIds.includes(props.currentId) ? selectedListStyle : null}
`;

export const DoneButton = styled.button`
  font-size: 3.524rem;
  font-weight: 700;
  line-height: 1.248013620885358;
  width: 232px;
  height: 76px;
  background-color: #defcf9;
  border: 2.94px solid #1e232c;
  border-radius: 73px;
  box-shadow: 4.405120372772217px 4.405120372772217px 0px 0px #00000040;
  margin-top: 26px;
`;
