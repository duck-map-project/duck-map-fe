import { css, styled } from 'styled-components';

import emptyImage from '../../assets/add-image-defalut.svg';
import ring from '../../assets/icons/ring.svg';
import tape from '../../assets/icons/tape.svg';
import pin from '../../assets/icons/thumbtack.svg';
import px2vw from '../../utils/px2vw';

export const PageWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px ${px2vw(142)} 0 ${px2vw(144)};
`;

export const RingsWrapper = styled.section`
  display: flex;
  gap: 70px;
  margin-bottom: -43px;
  position: relative;
  z-index: 9;
`;

export const Rings = styled.div`
  width: 79px;
  height: 81px;
  background-image: url(${ring});
  background-size: 79px 81px;
`;

export const ContentBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffbe2;
  padding: 81px ${px2vw(49)} 24px ${px2vw(45)};
  border: 2px solid #1e232c;
  border-radius: 20px;
  position: relative;
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #fffbe2;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 14px;
    z-index: -9;
  }
`;

export const TopSection = styled.section`
  width: 100%;
  display: flex;
  gap: 29px;
  margin-bottom: 18px;
`;

export const AddImageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;

export const CurrentPreview = styled.label<{ currentImage: string | null }>`
  width: 335px;
  height: 283px;
  background-color: #ededed;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-image: ${(props) =>
    props.currentImage ? `url(${props.currentImage})` : `url(${emptyImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${(props) => (props.currentImage ? 'cover' : '52.38px')};
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 94px;
    height: 40px;
    background-image: url(${tape});
    background-size: 94px;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%) rotateX(-5.19deg);
  }
`;

export const PreviewImageBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 12px;
`;

export const PreviewImageSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 287px;
  padding: 43px 0 42px;
  background-color: #f8f8fa;
  border: 2px solid #1e232c;
  border-radius: 20px;
  gap: 18px;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 61.56px;
    height: 83.72px;
    background-image: url(${pin});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%) rotateX(30deg);
  }
`;

export const SelectedImage = styled.div<{ selectedImage: string }>`
  width: 202px;
  height: 202px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-image: url(${(props) => props.selectedImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const smallButtonStyle = css`
  width: 150px;
  height: 40px;
  background-color: #defcf9;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

export const ButtonWraaper = styled.div`
  display: flex;
  gap: 10px;
`;

export const SmallButton = styled.button`
  ${smallButtonStyle}
  margin-right: 10px;
`;

export const ImageInputLabel = styled.label`
  display: block;
  text-align: center;
  ${smallButtonStyle}
  height: auto;
  padding: 5px;
`;

const commonSubmitButton = css`
  width: 232px;
  height: 76px;
  font-size: 3.524rem;
  font-weight: 700;
  line-height: 1.248013620885358;
  border: 2.94px solid #1e232c;
  border-radius: 73px;
  box-shadow: 4.405120372772217px 4.405120372772217px 0px 0px #00000040;
`;

export const SubmitButton = styled.button`
  ${commonSubmitButton}
  background-color: #defcf9;
  margin-right: ${px2vw(42)};
`;

export const CancelButton = styled.button`
  ${commonSubmitButton}
  background-color: #ededed;
  color: #8b8e97;
`;

export const TextSection = styled.textarea`
  width: 100%;
  height: 210px;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.333333333333333;
  padding: 23px 35px 10px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  /* FIXME: 배경색 값 가져올 수 없음 */
  background-color: #fff;
  margin-bottom: 16px;
  resize: none;
`;
