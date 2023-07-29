import { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import defalutImage from '../../assets/add-image-defalut.svg';
import closeIcon from '../../assets/close.svg';
import { toggleEventArtist } from '../../redux/manageModalSlice';
import { Input } from '../AuthInput';
import SelectedElement from '../SelectedElement';

import { PageWrapper } from './ModalStyle';

const EventModalPageWrapper = styled(PageWrapper)`
  background-color: #00000080;
`;

const Modal = styled.form`
  border-radius: 20px;
  border: 2px solid #1e232c;
  background-color: #ffd0ec;
  overflow: hidden;
  padding-top: 50px;
  position: relative;
`;

const ModalTitle = styled.h1`
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

const ContentsSection = styled.section`
  background-color: #fffbe2;
  border-top: 2px solid #1e232c;
  padding: 24px 38px 34px 28px;
`;

const EventImageSection = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 18.15px;
  margin-bottom: 24px;
`;

const EventImage = styled.li`
  width: 240px;
  height: 214px;
  background-color: #ededed;
  background-image: url(${defalutImage});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 29px;
  border: 2.06px solid #1e232c;
`;

const FileInputLabel = styled.label`
  display: block;
  width: 240px;
  height: 214px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const InfoSection = styled.section`
  display: grid;
  gap: 19.5px 32px;
  grid-template-columns: 128px auto;
`;

const InfoTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.248;
  margin: auto 0;
`;

const SelectButton = styled.button`
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

const RawWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
`;

const RawWrapperWithGap = styled(RawWrapper)`
  gap: 15px;
`;

const EventInput = styled(Input)`
  margin-top: 0;
`;

const LinkInput = styled(EventInput)`
  background-color: #9ac8ff;
  color: #ffffff;
`;

const HashTagInput = styled(EventInput)`
  background-color: #ffd0ec;
  color: #1e232c;
`;

const FormButtonRawWrapper = styled(RawWrapper)`
  gap: 20px;
  margin-top: 24px;
`;

const FormButton = styled.button`
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

const CancelButton = styled(FormButton)`
  background-color: #f0fffe;
  color: #8b8e97;
`;

interface Props {
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

const AddEventModal = ({ handleClose }: Props) => {
  const dispatch = useDispatch();
  const handdleSelectArtistButton = () => {
    dispatch(toggleEventArtist());
  };
  return (
    <EventModalPageWrapper>
      <Modal>
        <ModalCloseButton onClick={handleClose} />
        <ContentsSection>
          <ModalTitle>이벤트 등록하기</ModalTitle>
          <EventImageSection>
            <EventImage>
              <FileInputLabel htmlFor="event-image1" />
              <FileInput
                id="event-image1"
                name="event-image1"
                type="file"
                accept="image/*"
              />
            </EventImage>
            <EventImage>
              <FileInputLabel htmlFor="event-image2" />
              <FileInput
                id="event-image2"
                name="event-image2"
                type="file"
                accept="image/*"
              />
            </EventImage>
            <EventImage>
              <FileInputLabel htmlFor="event-image3" />
              <FileInput
                id="event-image3"
                name="event-image3"
                type="file"
                accept="image/*"
              />
            </EventImage>
          </EventImageSection>
          <InfoSection>
            <InfoTitle>아티스트</InfoTitle>
            <RawWrapper>
              <SelectButton type="button" onClick={handdleSelectArtistButton}>
                아티스트 선택
              </SelectButton>
              <SelectedElement>선택 아티스트</SelectedElement>
            </RawWrapper>
            <InfoTitle>카테고리</InfoTitle>
            <RawWrapper>
              <SelectButton type="button">카테고리 선택</SelectButton>
              <SelectedElement>선택 카테고리</SelectedElement>
            </RawWrapper>
            <InfoTitle>주소</InfoTitle>
            <EventInput placeholder="주소 입력" />
            <InfoTitle>영업 시간</InfoTitle>
            <RawWrapperWithGap>
              <EventInput type="time" />
              ~
              <EventInput type="time" />
            </RawWrapperWithGap>
            <InfoTitle>이벤트 날짜</InfoTitle>
            <RawWrapperWithGap>
              <EventInput type="date" />
              ~
              <EventInput type="date" />
            </RawWrapperWithGap>
            <InfoTitle>해시태그</InfoTitle>
            <HashTagInput placeholder="#생일해시태그 #생일해시태그" />
            <InfoTitle>트위터 링크</InfoTitle>
            <LinkInput placeholder="https://twitter.com/" />
          </InfoSection>
          <FormButtonRawWrapper>
            <CancelButton type="button" onClick={handleClose}>
              취소
            </CancelButton>
            <FormButton>저장</FormButton>
          </FormButtonRawWrapper>
        </ContentsSection>
      </Modal>
    </EventModalPageWrapper>
  );
};

export default AddEventModal;
