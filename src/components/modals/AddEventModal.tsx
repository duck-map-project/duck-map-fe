import { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleEventArtist,
  toggleEventCategory,
} from '../../redux/manageModalSlice';
import SelectedElement from '../SelectedElement';

import {
  CancelButton,
  ContentsSection,
  EventImage,
  EventImageSection,
  EventInput,
  EventModalPageWrapper,
  FileInput,
  FileInputLabel,
  FormButton,
  FormButtonRawWrapper,
  HashTagInput,
  InfoSection,
  InfoTitle,
  LinkInput,
  Modal,
  ModalCloseButton,
  ModalTitle,
  RawWrapper,
  RawWrapperWithGap,
  SelectButton,
} from './AddEventModalStyle';

interface Props {
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

const AddEventModal = ({ handleClose }: Props) => {
  const dispatch = useDispatch();
  const handdleSelectArtistButton = () => {
    dispatch(toggleEventArtist());
  };
  const handleSelectCategoryButton = () => {
    dispatch(toggleEventCategory());
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
              <SelectButton type="button" onClick={handleSelectCategoryButton}>
                카테고리 선택
              </SelectButton>
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
