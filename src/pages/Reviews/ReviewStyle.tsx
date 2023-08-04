import styled from 'styled-components';

type tabProps = {
  selected: boolean;
};

export const MainContent = styled.main`
  position: relative;
  width: 90%;
  max-width: 1200px;
  min-height: 60vh;
  margin: 74px auto;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #ffd0ec;
`;

export const ReviewWrapper = styled.div`
  padding: 20px 16px;
  min-height: 80vh;
  background-color: #ffebf4;
  margin: 20px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
`;

export const ScrollWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  min-height: 80vh;
  max-height: 486px;
  background-color: #ffebf4;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 17px;
    border: 2px solid var(--line-black);
    background-color: #8f9ef2;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: rgba(176, 180, 204, 0.5);
  }
`;

export const TabWrapper = styled.div`
  width: 80%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin: 28px auto 0;
  left: 50px;
  top: -84px;
`;

export const Tab = styled.label<tabProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  min-width: 216px;
  padding: 10px 23px;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  border-top: 2px solid var(--line-black);
  border-right: 2px solid var(--line-black);
  border-left: 2px solid var(--line-black);
  border-radius: 20px 20px 0 0;
  ${(props) =>
    props.selected
      ? `
      background-color: #ffd0ec;
  `
      : `
      background-color: #FFEBF4;
      border-bottom: 2px solid var(--line-black);
      top: -2px;
  `}
`;

export const NoticeNoReview = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;
