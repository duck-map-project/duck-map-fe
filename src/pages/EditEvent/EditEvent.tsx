import imageCompression from 'browser-image-compression';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import SelectedElement from '../../components/SelectedElement';
import { useRouter } from '../../hooks/useRouter';
import {
  useAddEventMutation,
  useEditEventMutation,
  useGetEventByIdQuery,
} from '../../redux/eventApiSlice';
import { selectPlaces, setPlace } from '../../redux/eventPlaceSlice';
import { useAddImageMutation } from '../../redux/imageSlice';
import {
  toggleAddressSearch,
  toggleEventArtist,
  toggleEventCategory,
} from '../../redux/manageModalSlice';
import {
  setArtist,
  setCategory,
  selectSelectedArtist,
  selectSelectedCategory,
} from '../../redux/setEventElemetsSlice';
import formattingHours from '../../utils/formattingHours';

import * as S from './EditEventStyle';

type EditEventType = {
  type: 'add' | 'edit';
};

const EditEvent = ({ type }: EditEventType) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const [imagePreview, setImagePreview] = useState({
    preview1: '',
    preview2: '',
    preview3: '',
  });
  const [images, SetImages] = useState<File[]>([]);
  const [savedImagefile, setSavedImagefile] = useState<string[]>([]); // 저장된 이미지의 filename
  const [eventId, setEventId] = useState<string>('');
  const [businessHour, setBusinessHour] = useState<string>('');
  const [skip, setSkip] = useState(true);
  const [twitterUrl, setTwitterUrl] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isCompression, setIsCompression] = useState<boolean>(false);
  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });
  const selectedArtistIds = useSelector(selectSelectedArtist);
  const selectedCategoryIds = useSelector(selectSelectedCategory);
  const place = useSelector(selectPlaces);
  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);
  const [addEvent] = useAddEventMutation();
  const [addNewImage] = useAddImageMutation();
  const [editEvent] = useEditEventMutation();

  useEffect(() => {
    if (id) {
      setEventId(id);
      setSkip(false);
    }
  }, [eventId]);

  const { data: EventByIdData } = useGetEventByIdQuery(eventId, { skip });

  useEffect(() => {
    if (type === 'edit' && EventByIdData) {
      // 프리뷰 이미지
      EventByIdData.images.forEach((image, index) => {
        const imageKey = `preview${index + 1}`;
        setImagePreview((prevImages) => ({
          ...prevImages,
          [imageKey]: baseUrl + image,
        }));
      });
      // 이미지파일 이름
      EventByIdData.images.forEach((image) => {
        const formattedImage = image.slice(8);
        setSavedImagefile((prev) => [...prev, formattedImage]);
      });

      // 아티스트
      dispatch(setArtist(EventByIdData.artists));
      // 카테고리
      dispatch(setCategory(EventByIdData.categories));
      // 주소
      setPlace;
      dispatch(
        setPlace([
          {
            address: [EventByIdData.address],
            storeName: [EventByIdData.storeName],
          },
        ])
      );
      // 영업 시간
      if (fromDateRef.current && toDateRef.current) {
        const hours = EventByIdData.businessHour.split(' ~ ');
        const [fromDate, toDate] = hours.map((original: any) =>
          formattingHours(original)
        );
        fromDateRef.current.value = fromDate;
        toDateRef.current.value = toDate;
        setBusinessHour(EventByIdData.businessHour);
      }
      // 이벤트 날짜
      setDate({
        fromDate: EventByIdData.fromDate,
        toDate: EventByIdData.toDate,
      });
      // 해시태그
      const hashTagsArr = EventByIdData.hashtag.split(' ');
      hashTagsArr.map((tag: any) => setHashtags((prev) => [...prev, tag]));

      // 트위터 url
      setTwitterUrl(EventByIdData.twitterUrl);
    }
  }, [EventByIdData]);

  const handleSelectArtistButton = () => {
    dispatch(toggleEventArtist());
  };

  const handleSelectCategoryButton = () => {
    dispatch(toggleEventCategory());
  };

  const handleAddressButton = () => {
    dispatch(toggleAddressSearch());
  };

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const artistIds = selectedArtistIds.map((artist) => artist.id);
    const categoryIds = selectedCategoryIds.map((category) => category.id);

    if (
      place.length !== 0 &&
      images.length !== 0 &&
      artistIds.length !== 0 &&
      categoryIds.length !== 0 &&
      businessHour &&
      date.fromDate &&
      date.toDate &&
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
          fromDate: date.fromDate,
          toDate: date.toDate,
          hashtag: hashtags.join(' '),
          twitterUrl,
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

  const handleEventDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTwitterUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterUrl(e.target.value);
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

  const handleEditSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const artistIds = selectedArtistIds.map((artist) => artist.id);
    const categoryIds = selectedCategoryIds.map((category) => category.id);

    const eventPayload = {
      storeName: place[0].storeName[0],
      artistIds,
      categoryIds,
      address: place[0].address[0],
      businessHour,
      fromDate: date.fromDate,
      toDate: date.toDate,
      hashtag: hashtags.join(' '),
      twitterUrl: twitterUrl,
    };

    if (
      place.length === 0 ||
      artistIds.length === 0 ||
      categoryIds.length === 0 ||
      !businessHour ||
      !date.fromDate ||
      !date.toDate ||
      !hashtags.some((hashtag) => hashtag.trim() !== '') ||
      !twitterUrl
    ) {
      alert('모든 값을 입력해주세요!');
      return;
    }

    // 추가된 이미지가 있을 경우
    if (images.length !== 0) {
      try {
        const compressionResult = await compressImages(images);
        const imageUrls = await uploadNewImage(compressionResult);

        const res = await editEvent({
          EventData: {
            ...eventPayload,
            imageFilenames: [...savedImagefile, ...imageUrls],
          },
          id,
        });
        if ('data' in res) {
          dispatch(setArtist([]));
          dispatch(setCategory([]));
          dispatch(
            setPlace([
              {
                address: '',
                storeName: '',
              },
            ])
          );
          routeTo(`/event/${id}`);
        } else if ('error' in res) {
          const error = res.error;
          if ('data' in error) {
            const data = error.data;
            if (
              data !== null &&
              typeof data === 'object' &&
              'message' in data
            ) {
              const errorMessage = data.message;
              alert(errorMessage);
              return;
            }
          }
          alert('잠시 후에 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }

    // 기존 이미지만 그대로 저장
    if (savedImagefile) {
      try {
        const res = await editEvent({
          EventData: { ...eventPayload, imageFilenames: savedImagefile },
          id,
        });
        console.log(res);
        if ('data' in res) {
          dispatch(setArtist([]));
          dispatch(setCategory([]));
          dispatch(
            setPlace([
              {
                address: '',
                storeName: '',
              },
            ])
          );
          routeTo(`/event/${id}`);
        } else if ('error' in res) {
          const error = res.error;
          if ('data' in error) {
            const data = error.data;
            if (
              data !== null &&
              typeof data === 'object' &&
              'message' in data
            ) {
              const errorMessage = data.message;
              alert(errorMessage);
              return;
            }
          }
          alert('잠시 후에 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <S.PageWrapper>
      {isCompression && (
        <Loading text="이벤트를 업로드 중입니다. 잠시만 기다려주세요." />
      )}
      <S.editEventBox>
        <S.Title>이벤트 {type === 'add' ? '추가' : '수정'}하기</S.Title>
        <S.FormSection>
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
              <S.SelectButton type="button" onClick={handleSelectArtistButton}>
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
              <S.EventInput
                type="date"
                name="fromDate"
                value={date.fromDate}
                onChange={handleEventDate}
              />
              ~
              <S.EventInput
                type="date"
                name="toDate"
                value={date.toDate}
                onChange={handleEventDate}
              />
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
              value={twitterUrl}
              onChange={handleTwitterUrl}
            />
          </S.InfoSection>
          <S.FormButtonRawWrapper>
            <S.CancelButton type="button">취소</S.CancelButton>
            <S.FormButton
              type="button"
              onClick={type === 'add' ? handleSubmit : handleEditSubmit}
            >
              저장
            </S.FormButton>
          </S.FormButtonRawWrapper>
        </S.FormSection>
      </S.editEventBox>
    </S.PageWrapper>
  );
};

export default EditEvent;
