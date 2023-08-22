import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

type EditBtnProps = {
  editmode: string | undefined;
};

export const FoldersHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 41px;
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: 150%;
    width: 100%;
    height: 8px;
    border: 2px solid var(--line-black);
    border-radius: 20px;
    background-color: #f9eca3;
    box-sizing: border-box;
  }
`;

export const Path = styled.div`
  display: flex;
  align-items: center;
  & > img {
    margin-right: 10px;
  }
  & > span {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }
  ${media.mobile`
    & > img {
      width: 16px;
      margin-left: 10px;
    }
    & > span {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `}
`;

export const GoBookmarkFolders = styled.span`
  cursor: pointer;
`;

export const SettingBtnWrapper = styled.div`
  display: flex;
  gap: 12px;
  ${media.mobile`
    gap: 10px;
  `}
`;

export const SettingBtnText = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
    display: none;
  `}
`;
export const SettingBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  background-color: #defcf9;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  & > img {
    margin-right: 10px;
  }
  ${media.mobile`
  min-width: 46px;
  & > img {
    width: 14px;
    height: 12px;
    margin: 0 auto;
  }
  `}
`;

export const GoEditBtn = styled(SettingBtn)<EditBtnProps>`
  ${(props) =>
    props.editmode &&
    `
  background-color: #B7EDE8;
`}
`;

export const FoldersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  ${media.mobile`
    gap: 13px;
  `}
`;
