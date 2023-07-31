import React, { MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  toggleEventArtist,
  toggleEventCategory,
} from '../../redux/manageModalSlice';
import { selectSelectedArtist } from '../../redux/setEventElemetsSlice';
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
  const [imagePreview, setImagePreview] = useState({
    preview1: '',
    preview2: '',
    preview3: '',
  });
  const selectedArtistIds = useSelector(selectSelectedArtist);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePreview((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <EventModalPageWrapper>
      <Modal>
        <ModalCloseButton onClick={handleClose} />
        <ContentsSection>
          <ModalTitle>이벤트 등록하기</ModalTitle>
          <EventImageSection>
            <EventImage>
              <FileInputLabel htmlFor="preview1" preview={imagePreview} />
              <FileInput
                id="preview1"
                name="preview1"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </EventImage>
            <EventImage>
              <FileInputLabel htmlFor="preview2" preview={imagePreview} />
              <FileInput
                id="preview2"
                name="preview2"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </EventImage>
            <EventImage>
              <FileInputLabel htmlFor="preview3" preview={imagePreview} />
              <FileInput
                id="preview3"
                name="preview3"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </EventImage>
          </EventImageSection>
          <InfoSection>
            <InfoTitle>아티스트</InfoTitle>
            <RawWrapper>
              <SelectButton type="button" onClick={handdleSelectArtistButton}>
                아티스트 선택
              </SelectButton>
              {selectedArtistIds &&
                selectedArtistIds.map((artists) => (
                  <SelectedElement key={artists.id} artistId={artists.id}>
                    {artists.name}
                  </SelectedElement>
                ))}
            </RawWrapper>
            <InfoTitle>카테고리</InfoTitle>
            <RawWrapper>
              <SelectButton type="button" onClick={handleSelectCategoryButton}>
                카테고리 선택
              </SelectButton>
              {/* <SelectedElement>선택 카테고리</SelectedElement> */}
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
