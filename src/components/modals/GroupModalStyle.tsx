import styled from 'styled-components';

import media from '../../utils/mediaQuery';

type imageType = {
  previewimage: string;
};

export const ModalTitle = styled.h4`
  max-width: 300px;
  padding: 13px 58px;
  margin: 24px 0 50px;
  background-color: #fcf9a4;
  border-radius: 73px;
  border: 2.937px solid var(--line-black);
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  ${media.mobile`
    min-width: 55%; 
    padding: 8px 20px;
    font-size: 20px;
    margin-bottom: 22.5px;
  `}
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 17px;
  ${media.mobile`
  & > img {
    width: 18px;
    height: 18px;
  }
  `}
`;

export const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
  ${media.mobile`
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 19px;
  `}
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

export const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const NameLabel = styled.label`
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
  ${media.mobile`
    font-size: 18px;
  `}
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
  box-shadow: 7px 5px 0px 0px rgb(0, 0, 0, 0.3);
  &::placeholder {
    font-size: 20px;
    color: #8f9196;
  }
  ${media.mobile`
    width: 90%;
    padding: 12px 20px;
    box-shadow: 3px 3px 0px 0px rgb(0, 0, 0, 0.25);
  `}
`;

export const SubmitButton = styled.button`
  width: 202px;
  font-size: 35px;
  font-weight: 700;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
  box-shadow: 6px 4px 0px 0px rgb(0, 0, 0, 0.3);
  ${media.mobile`
  max-width: 150px;
    padding: 12px 50px;
    font-size: 20px;
  `}
`;
