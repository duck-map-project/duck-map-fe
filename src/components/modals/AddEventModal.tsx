import React, { FormEvent, MouseEventHandler, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import { useAddEventMutation } from '../../redux/eventApiSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import {
  toggleEventArtist,
  toggleEventCategory,
} from '../../redux/manageModalSlice';
import {
  selectSelectedArtist,
  selectSelectedCategory,
} from '../../redux/setEventElemetsSlice';
import AdressInput from '../AdressInput';
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

interface Place {
  place_name: string;
  address_name: string;
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
  const [images, SetImages] = useState<File[]>([]);
  const selectedArtistIds = useSelector(selectSelectedArtist);
  const selectedCategoryIds = useSelector(selectSelectedCategory);
  const [place, setPlace] = useState<Place>({
    place_name: '',
    address_name: '',
  });
  const [businessHour, setBusinessHour] = useState<string>('');
  const fromDate = useInput('');
  const toDate = useInput('');
  const hashTag = useInput('');
  const twitterUrl = useInput('');
  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);
  const [addEvent] = useAddEventMutation();
  const [addNewImage] = useAddImageMutation();
  const { routeTo } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artistIds = selectedArtistIds.map((artist) => artist.id);
    const categoryIds = selectedCategoryIds.map((category) => category.id);

    if (
      images.length !== 0 &&
      artistIds.length !== 0 &&
      categoryIds.length !== 0 &&
      place &&
      businessHour &&
      fromDate &&
      toDate &&
      hashTag &&
      twitterUrl
    ) {
      try {
        const imageUrls = await Promise.all(
          Object.values(images).map(async (image: File) => {
            const formData = new FormData();
            formData.append('file', image);
            const imagesResults = await addNewImage({ imageFile: formData });
            if ('data' in imagesResults) {
              return imagesResults.data.filename;
            }
          })
        );

        const eventPayload = {
          storeName: place.place_name,
          artistIds,
          categoryIds,
          address: place.address_name,
          businessHour,
          fromDate: fromDate.value,
          toDate: toDate.value,
          hashtag: hashTag.value,
          twitterUrl: twitterUrl.value,
          imageFilenames: imageUrls,
        };

        const eventResult = await addEvent(eventPayload);
        if ('data' in eventResult) {
          routeTo(`/events/${eventResult?.data.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePreview((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(file),
      }));
      SetImages((prevImages) => ({
        ...prevImages,
        [e.target.name]: file,
      }));
    }
  };

  const handleAddressChange = (place: Place) => {
    setPlace(place);
  };

  const handleBusinessHourChange = () => {
    if (fromDateRef.current && toDateRef.current) {
      const fromDateValue = fromDateRef.current.value;
      const toDateValue = toDateRef.current.value;

      const [fromHours, fromMinutes] = fromDateValue.split(':');
      const [toHours, toMinutes] = toDateValue.split(':');

      let fromAmPm = 'AM';
      let toAmPm = 'AM';

      let fromHoursInt = parseInt(fromHours, 10);
      let toHoursInt = parseInt(toHours, 10);

      if (fromHoursInt >= 12) {
        fromAmPm = 'PM';
        fromHoursInt = fromHoursInt === 12 ? 12 : fromHoursInt - 12;
      } else if (fromHoursInt === 0) {
        fromHoursInt = 12;
      }

      if (toHoursInt >= 12) {
        toAmPm = 'PM';
        toHoursInt = toHoursInt === 12 ? 12 : toHoursInt - 12;
      } else if (toHoursInt === 0) {
        toHoursInt = 12;
      }

      const fromTimeInAmPmFormat = `${fromAmPm} ${fromHoursInt}:${fromMinutes}`;
      const toTimeInAmPmFormat = `${toAmPm} ${toHoursInt}:${toMinutes}`;
      const businessHourString = `${fromTimeInAmPmFormat} ~ ${toTimeInAmPmFormat}`;

      setBusinessHour(businessHourString);
    }
  };

  return (
    <EventModalPageWrapper>
      <Modal onSubmit={handleSubmit}>
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
                  <SelectedElement key={artists.id} currentId={artists.id}>
                    {artists.name}
                  </SelectedElement>
                ))}
            </RawWrapper>
            <InfoTitle>카테고리</InfoTitle>
            <RawWrapper>
              <SelectButton type="button" onClick={handleSelectCategoryButton}>
                카테고리 선택
              </SelectButton>
              {selectedCategoryIds &&
                selectedCategoryIds.map((category) => (
                  <SelectedElement
                    key={category.id}
                    currentId={category.id}
                    isCategory={true}
                  >
                    {category.category}
                  </SelectedElement>
                ))}
            </RawWrapper>
            {/* TODO: 디자인 요청하기 */}
            <InfoTitle>주소</InfoTitle>
            <RawWrapper>
              <AdressInput onPlaceChange={handleAddressChange} />
              <div>{place.address_name}</div>
            </RawWrapper>
            <InfoTitle>영업 시간</InfoTitle>
            <RawWrapperWithGap>
              <EventInput
                type="time"
                ref={fromDateRef}
                onChange={handleBusinessHourChange}
              />
              ~
              <EventInput
                type="time"
                ref={toDateRef}
                onChange={handleBusinessHourChange}
              />
            </RawWrapperWithGap>
            <InfoTitle>이벤트 날짜</InfoTitle>
            <RawWrapperWithGap>
              <EventInput type="date" onChange={fromDate.onChange} />
              ~
              <EventInput type="date" onChange={toDate.onChange} />
            </RawWrapperWithGap>
            <InfoTitle>해시태그</InfoTitle>
            <HashTagInput
              placeholder="#생일해시태그 #생일해시태그"
              type="text"
              onChange={hashTag.onChange}
            />
            <InfoTitle>트위터 링크</InfoTitle>
            <LinkInput
              placeholder="https://twitter.com/"
              type="text"
              onChange={twitterUrl.onChange}
            />
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
