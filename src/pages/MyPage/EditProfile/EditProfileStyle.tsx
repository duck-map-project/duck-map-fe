import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

type imageType = {
  previewimage: string;
};

export const UserProfileEditForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ImagePreview = styled.label<imageType>`
  display: block;
  position: relative;
  width: 161px;
  height: 161px;
  margin-bottom: 51px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
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
  ${media.mobile`
    width:140px;
    height: 140px;
    margin-bottom: 48px;
  `}
`;

export const HiddenInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  ${media.mobile`
    width: 100%;
    padding-left: 10px;
  `}
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: -55px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
  position: relative;
    width: 20%;
    left: 0px;
    font-size: 16px;
  `}
`;

export const StyledInput = styled.input`
  display: block;
  width: 308px;
  padding: 10px;
  margin-left: 22px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  border-radius: 20px;
  ${media.mobile`
    width: 80%;
    margin-left: 14px;
  `}
`;

export const EmailInput = styled(StyledInput)`
  border: 2px solid #4e5761;
  background-color: transparent;
`;

export const UsernameInput = styled(StyledInput)`
  border: 2px solid var(--line-black);
  background-color: #f8f8fa;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
`;

export const BtnWrapper = styled.section`
  margin-top: 102px;
  ${media.mobile`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 74px;
  `}
`;

export const StyledBtn = styled.button`
  width: 233px;
  padding: 17px;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  border-radius: 50px;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  ${media.mobile`
    width: 90%;
    padding: 9px;
  `}
`;

export const UnregisterBtn = styled(StyledBtn)`
  margin-right: 18px;
  color: #8b8e97;
  border: 2px solid #8b8e97;
  background-color: #e7efee;
  ${media.mobile`
    margin: 0 auto;
  `}
`;

export const EditSubmitBtn = styled(StyledBtn)`
  color: var(--font-black);
  border: 2px solid var(--line-black);
  background-color: #defcf9;
`;
