import styled from 'styled-components';

import bookmark from '../../assets/bookmark-empty.svg';
import bookmarkActive from '../../assets/bookmark-filled.svg';
import heart from '../../assets/empty-heart.svg';
import heartActive from '../../assets/filled-heart.svg';

export const PageWrapper = styled.main``;

export const TopSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 55px;
`;

export const ImgSection = styled.section`
  position: relative;
`;

export const EventImg = styled.section<{ url: string }>`
  width: 460px;
  height: 460px;
  background-image: url(${(props) => props.url});
`;

export const ImgNumMarkWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  & > div {
    margin-right: 26px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`;

export const ImgNumMarkCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--disabled);
  cursor: pointer;
`;

export const ImgNumMarkCirclePurple = styled(ImgNumMarkCircle)`
  background-color: var(--purple);
`;

export const HeartButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 78px;
  bottom: -17px;
`;

export const LikeNum = styled.span`
  font-size: 1.6rem;
`;

export const HeartButton = styled.button<{ checked: boolean }>`
  width: 30px;
  height: 27px;
  background-image: url(${(props) => (props.checked ? heartActive : heart)});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const BookmarkButton = styled(HeartButton)`
  width: 35px;
  height: 45px;
  position: absolute;
  right: 16px;
  bottom: -17px;
  ${(props) =>
    props.checked
      ? `background-image: url(${bookmarkActive})`
      : `background-image: url(${bookmark})`}
`;

export const InfoSection = styled.section`
  width: 100%;
  max-width: 502px;
  display: grid;
  grid-template-columns: 1fr 119px;
  grid-template-rows: repeat(6, 50px);
  position: relative;
  gap: 15px 23px;
  /* TODO: 텍스트 박스 컴포넌트 추가하면 없애기 */
  & > div {
    width: 100%;
    padding: 13px 0 18px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid var(--blue-purple);
  }
  & > div:first-child {
    grid-column: 1 / 3;
  }
  & > div:nth-child(2) {
    grid-column: 1 / 3;
  }
  & > div:nth-child(5) {
    grid-column: 1 / 3;
  }
  & > div:last-child {
    position: absolute;
    bottom: 23.5px;
    justify-content: center;
    border: none;
  }
`;

export const DetailSection = styled.section``;

export const TabSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 31px;
  border-bottom: 3px solid var(--purple);
  & > button {
    margin-right: 62px;
  }
  & > button:last-child {
    margin-right: 0;
  }
`;

export const TabButton = styled.button<{
  currentTab?: string;
  tabType: string;
}>`
  width: 50px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: ${(props) =>
    props.currentTab === props.tabType ? 'var(--purple)' : 'var(--disabled)'};
  border-bottom: ${(props) =>
    props.currentTab === props.tabType ? `5px solid var(--purple)` : ''};
  cursor: pointer;
`;

export const TabInfoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
`;

export const TabMapImg = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 7px;
`;

export const DetailContents = styled.section``;
