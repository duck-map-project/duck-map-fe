import { styled } from 'styled-components';

import defalutImage from '../../assets/add-image-defalut.svg';
import closeIcon from '../../assets/close.svg';
import heart from '../../assets/edit-event-heart.svg';
import plusIcon from '../../assets/icon-button-plus.svg';
import { Input } from '../../components/AuthInput';

export const PageWrapper = styled.main`
  padding: 38px 0 72px;
  display: flex;
  justify-content: center;
`;

export const editEventBox = styled.section`
  width: 100%;
  max-width: 1156px;
  background-color: #ffd0ec;
  border: 2px solid #1e232c;
  border-radius: 20px;
  position: relative;
  padding: 13px 0 30px;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: #ffd0ec;
    border: 2px solid #1e232c;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -9;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.247857142857143;
  margin: 0 auto 12px;
  text-align: center;
  background-color: #ffebf4;
  border: 2px solid #000000;
  border-radius: 50px;
  padding: 16px 50px;
`;

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px 98px 30px;
  background-color: #ffebf4;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
`;

export const EventImageSection = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 29.11px;
`;

export const EventImage = styled.li`
  width: 290.07px;
  height: 258.89px;
  border-radius: 29px;
  border: 2.06px solid #1e232c;
  overflow: hidden;
`;

export const FileInputLabel = styled.label<{
  preview: { preview1: string; preview2: string; preview3: string };
}>`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ededed;
  background-image: ${(props) =>
    props.preview && props.preview[props.htmlFor as keyof typeof props.preview]
      ? `url(${props.preview[props.htmlFor as keyof typeof props.preview]})`
      : `url(${defalutImage})`};
  background-size: ${(props) =>
    props.preview && props.preview[props.htmlFor as keyof typeof props.preview]
      ? 'cover'
      : ''};
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const InfoSection = styled.section`
  width: 100%;
  display: grid;
  gap: 12px 20px;
  grid-template-columns: 155px auto;
`;

export const InfoTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  margin: auto 0;
  padding-left: 37px;
  background-image: url(${heart});
  background-repeat: no-repeat;
  background-position: 10px center;
`;

export const SelectButton = styled.button`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.247777777777778;
  width: 126px;
  height: 40px;
  border: 2px solid #1e232c;
  border-radius: 20px;
  background-color: #9fe5fb;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

export const SearchButton = styled(SelectButton)`
  width: 84px;
`;

export const ModalCloseButton = styled.button`
  width: 30px;
  height: 30px;
  background-image: url(${closeIcon});
  background-size: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
`;

export const RawWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
`;

export const RawWrapperWithGap = styled(RawWrapper)`
  gap: 15px;
`;

export const RawWrapperForHashtag = styled(RawWrapper)`
  gap: 7px;
`;

export const EventInput = styled(Input)`
  margin-top: 0;
`;

export const AdressDisplayInput = styled(EventInput)`
  width: 100%;
  color: #1e232c4d;
  background-color: #f8f8fa4d;
  border: 2px solid #1e232c4d;
  box-shadow: 4px 4px 0px 0px #00000040;
`;

export const LinkInput = styled(EventInput)`
  background-color: #9ac8ff;
  color: #ffffff;
`;

export const HashTagInput = styled(EventInput)`
  width: 132px;
  background-color: #ffd0ec;
  color: #1e232c;
`;

export const FormButtonRawWrapper = styled(RawWrapper)`
  gap: 20px;
  margin-top: 28px;
`;

export const FormButton = styled.button`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  width: 162px;
  height: 58px;
  border: 2px solid #1e232c;
  border-radius: 50px;
  box-shadow: 4px 4px 0px 0px #00000040;
  background-color: #defcf9;
  color: #1e232c;
  flex-grow: 1;
`;

export const CancelButton = styled(FormButton)`
  background-color: #f0fffe;
  color: #8b8e97;
`;

export const AddInputButton = styled.button`
  width: 33px;
  height: 31px;
  background-color: #ffe1f3;
  border-radius: 20px;
  border: 2px solid #1e232c;
  box-shadow: 4px 4px 0px 0px #00000040;
  background-image: url(${plusIcon});
  background-repeat: no-repeat;
  background-position: center;
`;
