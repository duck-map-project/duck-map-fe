import styled from 'styled-components';

import SortDropdown from '../SortButton';

type imageType = {
  previewimage: string;
};

export const ModalTitle = styled.h4`
  padding: 13px 58px;
  margin: 24px 0 22px;
  background-color: #fcf9a4;
  border-radius: 73px;
  border: 2.937px solid var(--line-black);
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 17px;
`;

export const TypeTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 70%;
  margin: 10px 0 32px;
`;

export const ImagePreview = styled.label<imageType>`
  display: block;
  position: relative;
  width: 232px;
  height: 232px;
  border: 2px solid var(--line-black);
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    props.previewimage
      ? `
      background-image: url(${props.previewimage});
      background-size: cover;
      background-position: center center;
      `
      : `
      background-color: var(--line-grey2);
      `}
  & > img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const GroupSortDropdown = styled(SortDropdown)`
  position: relative;
  right: 0;
`;

export const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
`;

export const NameLabel = styled.label`
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
`;

export const NameInput = styled.input`
  width: 360px;
  height: 58px;
  padding: 20px;
  font-size: 20px;
  font-weight: 400;
  background-color: #f8f8fa;
  border: 1.4px solid var(--font-black);
  border-radius: 30px;
  &::placeholder {
    font-size: 20px;
    color: 4e5761;
  }
`;

export const SubmitButton = styled.button`
  width: 202px;
  font-size: 35px;
  font-weight: 700;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
`;
