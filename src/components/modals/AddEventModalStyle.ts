import { styled } from 'styled-components';

import defalutImage from '../../assets/add-image-defalut.svg';
import closeIcon from '../../assets/close.svg';
import { Input } from '../AuthInput';

import { PageWrapper } from './ModalStyle';

export const EventModalPageWrapper = styled(PageWrapper)`
  background-color: #00000080;
`;

export const Modal = styled.form`
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: #ffd0ec;
  overflow: hidden;
  padding-top: 50px;
  position: relative;
`;

export const ModalTitle = styled.h1`
  width: 300px;
  padding: 12.5px 0;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.390714285714286;
  background-color: #fcf9a4;
  border: 2.94px solid #1e232c;
  border-radius: 73px;
  text-align: center;
  margin: 0 auto 20px;
`;

export const ContentsSection = styled.section`
  background-color: #fffbe2;
  border-top: 2px solid #1e232c;
  padding: 24px 38px 34px 28px;
`;

export const EventImageSection = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 18.15px;
  margin-bottom: 24px;
`;

export const EventImage = styled.li`
  width: 240px;
  height: 214px;
  background-color: #ededed;
  background-image: url(${defalutImage});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 29px;
  border: 2.06px solid #1e232c;
`;

export const FileInputLabel = styled.label`
  display: block;
  width: 240px;
  height: 214px;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const InfoSection = styled.section`
  display: grid;
  gap: 19.5px 32px;
  grid-template-columns: 128px auto;
`;

export const InfoTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  margin: auto 0;
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

export const EventInput = styled(Input)`
  margin-top: 0;
`;

export const LinkInput = styled(EventInput)`
  background-color: #9ac8ff;
  color: #ffffff;
`;

export const HashTagInput = styled(EventInput)`
  background-color: #ffd0ec;
  color: #1e232c;
`;

export const FormButtonRawWrapper = styled(RawWrapper)`
  gap: 20px;
  margin-top: 24px;
`;

export const FormButton = styled.button`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.247916666666667;
  width: 100px;
  height: 64px;
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
