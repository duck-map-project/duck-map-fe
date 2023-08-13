import imageCompression from 'browser-image-compression';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import SelectedElement from '../../components/SelectedElement';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import { useAddEventMutation } from '../../redux/eventApiSlice';
import { selectPlaces } from '../../redux/eventPlaceSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import {
  toggleAddressSearch,
  toggleEventArtist,
  toggleEventCategory,
} from '../../redux/manageModalSlice';
import {
  selectSelectedArtist,
  selectSelectedCategory,
} from '../../redux/setEventElemetsSlice';

import * as S from './EditEventStyle';

const EditEvent = () => {
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
  const [businessHour, setBusinessHour] = useState<string>('');
  const fromDate = useInput('');
  const toDate = useInput('');
  const twitterUrl = useInput('');
  const [hashtags, setHashtags] = useState<string[]>(['']);
  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);
  const [addEvent] = useAddEventMutation();
  const [addNewImage] = useAddImageMutation();
  const { routeTo } = useRouter();
  const place = useSelector(selectPlaces);
  const [isCompression, setIsCompression] = useState<boolean>(false);

  const handleHashtagChange = (index: number, value: string) => {
    const newHashtag = [...hashtags];
    newHashtag[index] = value;
    setHashtags(newHashtag);
  };

  const handleAddHashtag = () => {
    setHashtags((prev) => [...prev, '']);
  };

  const compressImages = async (images: File[]): Promise<File[]> => {
    const compressionImages = await Promise.all(
      images.map(async (image: File) => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 438,
          };
          setIsCompression(true);
          const compressionResult = await imageCompression(image, options);
          return compressionResult;
        } catch (error) {
          console.error(error);
          setIsCompression(false);
          alert('이미지 압축 실패!');
          return;
        }
      })
    );

    return compressionImages.filter((image) => image !== undefined) as File[];
  };

  const uploadNewImage = async (images: File[]): Promise<string[]> => {
    const imageUrls = await Promise.all(
      images.map(async (image: File) => {
        try {
          const formData = new FormData();
          formData.append('file', image);
          const uploadResult = await addNewImage({
            imageFile: formData,
          }).unwrap();
          return uploadResult.filename;
        } catch (error) {
          console.error(error);
          alert('이미지 업로드 실패!');
          return;
        }
      })
    );

    return imageUrls.filter((image) => image !== undefined) as string[];
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artistIds = selectedArtistIds.map((artist) => artist.id);
    const categoryIds = selectedCategoryIds.map((category) => category.id);

    if (
      place.length !== 0 &&
      images.length !== 0 &&
      artistIds.length !== 0 &&
      categoryIds.length !== 0 &&
      businessHour &&
      fromDate &&
      toDate &&
      hashtags.some((hastag) => hastag.trim() !== '') &&
      twitterUrl
    ) {
      try {
        const compressionResult = await compressImages(images);
        const imageUrls = await uploadNewImage(compressionResult);

        const eventPayload = {
          storeName: place[0].storeName[0],
          artistIds,
          categoryIds,
          address: place[0].address[0],
          businessHour,
          fromDate: fromDate.value,
          toDate: toDate.value,
          hashtag: hashtags.join(' '),
          twitterUrl: twitterUrl.value,
          imageFilenames: imageUrls,
        };

        const eventResult = await addEvent(eventPayload);
        if ('data' in eventResult) {
          routeTo(`/event/${eventResult?.data.id}`);
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
      SetImages((prevImages) => [...prevImages, file]);
    }
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

  const handleAddressButton = () => {
    dispatch(toggleAddressSearch());
  };

  return (
    <S.PageWrapper>
      {isCompression && (
        <Loading text="이벤트를 업로드 중입니다. 잠시만 기다려주세요." />
      )}
      <S.editEventBox>
        <S.Title>이벤트 추가하기</S.Title>
        <S.FormSection onSubmit={handleSubmit}>
          <S.EventImageSection>
            <S.EventImage>
              <S.FileInputLabel htmlFor="preview1" preview={imagePreview} />
              <S.FileInput
                id="preview1"
                name="preview1"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </S.EventImage>
            <S.EventImage>
              <S.FileInputLabel htmlFor="preview2" preview={imagePreview} />
              <S.FileInput
                id="preview2"
                name="preview2"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </S.EventImage>
            <S.EventImage>
              <S.FileInputLabel htmlFor="preview3" preview={imagePreview} />
              <S.FileInput
                id="preview3"
                name="preview3"
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
              />
            </S.EventImage>
          </S.EventImageSection>
          <S.InfoSection>
            <S.InfoTitle>아티스트</S.InfoTitle>
            <S.RawWrapper>
              <S.SelectButton type="button" onClick={handdleSelectArtistButton}>
                아티스트 선택
              </S.SelectButton>
              {selectedArtistIds &&
                selectedArtistIds.map((artists) => (
                  <SelectedElement key={artists.id} currentId={artists.id}>
                    {artists.name}
                  </SelectedElement>
                ))}
            </S.RawWrapper>
            <S.InfoTitle>카테고리</S.InfoTitle>
            <S.RawWrapper>
              <S.SelectButton
                type="button"
                onClick={handleSelectCategoryButton}
              >
                카테고리 선택
              </S.SelectButton>
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
            </S.RawWrapper>
            {/* TODO: 디자인 요청하기 */}
            <S.InfoTitle>주소</S.InfoTitle>
            <S.RawWrapper>
              <S.SearchButton type="button" onClick={handleAddressButton}>
                검색
              </S.SearchButton>
              <S.AdressDisplayInput
                readOnly
                placeholder={place.length !== 0 ? place[0].address[0] : ''}
              />
            </S.RawWrapper>
            <S.InfoTitle>영업 시간</S.InfoTitle>
            <S.RawWrapperWithGap>
              <S.EventInput
                type="time"
                ref={fromDateRef}
                onChange={handleBusinessHourChange}
              />
              ~
              <S.EventInput
                type="time"
                ref={toDateRef}
                onChange={handleBusinessHourChange}
              />
            </S.RawWrapperWithGap>
            <S.InfoTitle>이벤트 날짜</S.InfoTitle>
            <S.RawWrapperWithGap>
              <S.EventInput type="date" onChange={fromDate.onChange} />
              ~
              <S.EventInput type="date" onChange={toDate.onChange} />
            </S.RawWrapperWithGap>
            <S.InfoTitle>해시태그</S.InfoTitle>
            <S.RawWrapperForHashtag>
              {hashtags.map((hashtag, index) => (
                <S.HashTagInput
                  key={index}
                  value={hashtag}
                  placeholder="#해시태그"
                  type="text"
                  onChange={(e) => handleHashtagChange(index, e.target.value)}
                />
              ))}
              <S.AddInputButton type="button" onClick={handleAddHashtag} />
            </S.RawWrapperForHashtag>
            <S.InfoTitle>트위터 링크</S.InfoTitle>
            <S.LinkInput
              placeholder="https://twitter.com/"
              type="text"
              onChange={twitterUrl.onChange}
            />
          </S.InfoSection>
          <S.FormButtonRawWrapper>
            <S.CancelButton type="button">취소</S.CancelButton>
            <S.FormButton>저장</S.FormButton>
          </S.FormButtonRawWrapper>
        </S.FormSection>
      </S.editEventBox>
    </S.PageWrapper>
  );
};

export default EditEvent;
