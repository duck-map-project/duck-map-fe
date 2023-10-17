import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FixedRating from '../../components/FixedRating';
import { TextBox, TextBoxWithTitle } from '../../components/TextBoxs';
import { selectCurrentUser } from '../../features/auth/services/authSlice';
import { useDeleteBookmarkEventMutation } from '../../features/bookmarks/services/bookmarkEventApiSlice';
import {
  addBookmarkInfo,
  selectAddBookmarkInfo,
} from '../../features/bookmarks/services/setBookmark';
import { useGetEventByIdQuery } from '../../features/events/services/eventApiSlice';
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
} from '../../features/events/services/eventApiSlice';
import { setPlace } from '../../features/events/services/eventPlaceSlice';
import { toggleAddBookmark } from '../../features/modal/manageModalSlice';
import { useRouter } from '../../hooks/useRouter';
import { EventData } from '../../types/eventService';

import {
  ImgSection,
  PageWrapper,
  TopSectionWrapper,
  TopSection,
  InfoSection,
  HeartButtonWrapper,
  HeartButton,
  LikeNum,
  BookmarkButton,
  TabSection,
  HeartContour,
  SmallHeart,
  CopyButton,
  CopyTextBoxWrapper,
  InfoButton,
  MapButton,
  ReviewButton,
  DetailContents,
  AddReviewButton,
} from './DetailInfoStyle';
import ImageSlider from './ImageSlider';
import MapSection from './MapSection';
import ReviewSection from './ReviewSection';
import TwitterInfoSection from './TwitterInfoSection';

const DetailInfo = () => {
  type CurrentType = 'info' | 'map' | 'review';

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [currentTab, setCurrentTab] = useState<CurrentType>('info');

  const handleTabClick = (tab: CurrentType) => {
    setCurrentTab(tab);
  };

  const { id } = useParams<{ id: string }>();
  const { data: eventInfoData, refetch } = useGetEventByIdQuery(id as string);
  const [isLike, setIsLike] = useState(eventInfoData?.likeId ? true : false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventData | null>(null);
  const bookmarkInfoState = useSelector(selectAddBookmarkInfo);
  const [deleteBookmark] = useDeleteBookmarkEventMutation();
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventInfoData && id) {
      setEventInfo(eventInfoData);
      if (eventInfoData.likeId) {
        setIsLike(true);
      }
      if (eventInfoData.bookmarkId) {
        setIsBookmark(true);
      }
    }
  }, [eventInfoData]);

  useEffect(() => {
    if (eventInfo) {
      const processedPlace = [
        {
          address: [eventInfo.address],
          storeName: [eventInfo.storeName],
        },
      ];
      dispatch(setPlace(processedPlace));
    }
  }, [currentTab]);

  const images = eventInfo?.images.map((image) => baseUrl + image);

  const handleLikeButton = async () => {
    if (user) {
      if (id) {
        if (eventInfo?.likeId) {
          try {
            await deleteLike(eventInfo?.likeId).unwrap();
            refetch();
          } catch (error) {
            console.error(error);
          }
        } else {
          try {
            await addLike(id).unwrap();
            refetch();
          } catch (error) {
            console.error(error);
          }
        }
      }
    } else {
      alert('로그인이 필요합니다!');
    }
  };

  const handleBookmarkButton = async () => {
    if (user) {
      if (isBookmark && id) {
        const eventId = parseInt(id);
        const res = await deleteBookmark({ id: eventId });

        if ('data' in res) {
          setIsBookmark(false);
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
        return;
      }
      dispatch(addBookmarkInfo({ eventId: id }));
      dispatch(toggleAddBookmark());
    } else {
      alert('로그인이 필요합니다!');
    }
  };

  useEffect(() => {
    if (
      bookmarkInfoState.eventId === id &&
      bookmarkInfoState.isBookmark === true
    ) {
      setIsBookmark(true);
      dispatch(addBookmarkInfo({ eventId: null, isBookmark: false }));
      return;
    }
  }, [bookmarkInfoState]);

  return (
    <PageWrapper>
      <TopSectionWrapper>
        <TopSection>
          <ImgSection>
            <ImageSlider images={images as string[]} />
            <HeartButtonWrapper>
              <HeartButton checked={isLike} onClick={handleLikeButton} />
              <LikeNum>{eventInfo?.likeCount}</LikeNum>
            </HeartButtonWrapper>
            <BookmarkButton
              checked={isBookmark}
              onClick={handleBookmarkButton}
            />
          </ImgSection>
          <InfoSection>
            <TextBox>{eventInfo?.storeName}</TextBox>
            <div>
              <HeartContour>
                <SmallHeart />
                <SmallHeart />
                <SmallHeart />
              </HeartContour>
            </div>
            <FixedRating
              score={eventInfo?.score as number}
              marginB="10px"
              className="detailinfo"
            />
            <TextBoxWithTitle title="이벤트 기간">
              {eventInfo?.fromDate} ~ {eventInfo?.toDate}
            </TextBoxWithTitle>
            <TextBoxWithTitle title="영업 시간">
              {eventInfo?.businessHour}
            </TextBoxWithTitle>
            <CopyTextBoxWrapper>
              <TextBoxWithTitle title="해시태그">
                {eventInfo?.hashtag}
              </TextBoxWithTitle>
              <CopyToClipboard
                text={eventInfo?.hashtag as string}
                onCopy={() => alert('클립보드에 복사되었습니다!')}
              >
                <CopyButton>복사하기</CopyButton>
              </CopyToClipboard>
            </CopyTextBoxWrapper>
            <CopyTextBoxWrapper>
              <TextBoxWithTitle title="주소">
                {eventInfo?.address}
              </TextBoxWithTitle>
              <CopyToClipboard
                text={eventInfo?.address as string}
                onCopy={() => alert('클립보드에 복사되었습니다!')}
              >
                <CopyButton>복사하기</CopyButton>
              </CopyToClipboard>
            </CopyTextBoxWrapper>
          </InfoSection>
          <TabSection>
            <InfoButton
              onClick={() => {
                handleTabClick('info');
              }}
              $currentTab={currentTab}
              $tabType="info"
            >
              Info
            </InfoButton>
            <MapButton
              onClick={() => {
                handleTabClick('map');
              }}
              $currentTab={currentTab}
              $tabType="map"
            >
              Map
            </MapButton>
            <ReviewButton
              onClick={() => {
                handleTabClick('review');
              }}
              $currentTab={currentTab}
              $tabType="review"
            >
              Review
            </ReviewButton>
          </TabSection>
        </TopSection>
      </TopSectionWrapper>
      {user && (
        <AddReviewButton
          type="button"
          onClick={() => routeTo(`/review/edit/${id}`)}
        >
          리뷰 작성
        </AddReviewButton>
      )}
      <DetailContents>
        {currentTab === 'info' && eventInfo?.twitterUrl ? (
          <TwitterInfoSection twitterUrl={eventInfo?.twitterUrl} />
        ) : currentTab === 'map' ? (
          <MapSection />
        ) : currentTab === 'review' ? (
          <ReviewSection />
        ) : null}
      </DetailContents>
    </PageWrapper>
  );
};
export default DetailInfo;
