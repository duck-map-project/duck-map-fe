import styled from 'styled-components';

import media from '../../utils/mediaQuery';

type imageType = {
  previewimage: string;
};

export const ModalTitle = styled.h4`
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
    margin-bottom: 22.5px;
    padding: 8px 20px;
    font-size: 20px;
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
    ${media.mobile`
    width: 60px;
      
    `}
  }
  ${media.mobile`
    width: 150px;
    height: 153px;
  `}
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
  position: relative;
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
    ${media.mobile`
      font-size: 14px;
    `}
  }
  ${media.mobile`
    width: 100%;
    height: 36px;
    padding: 6px 20px;
    font-size: 14px;
    box-shadow: 3px 3px 0px 0px rgb(0, 0, 0, 0.25);
  `}
`;

export const SubmitButton = styled.button`
  position: relative;
  width: 30%;
  font-size: 35px;
  font-weight: 700;
  padding: 16px 50px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
  box-shadow: 6px 4px 0px 0px rgb(0, 0, 0, 0.3);
  ${media.mobile`
  width: 50%;
    font-size: 20px;
    padding: 12px 50px;
  border: 2px solid var(--line-black);
  `}
`;
