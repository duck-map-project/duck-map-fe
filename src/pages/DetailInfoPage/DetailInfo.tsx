import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import FixedRating from '../../components/FixedRating';
import { TextBox, TextBoxWithTitle } from '../../components/TextBoxs';
import { useRouter } from '../../hooks/useRouter';
import { useGetEventByIdQuery } from '../../redux/eventApiSlice';
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
} from '../../redux/eventApiSlice';
import { setPlace } from '../../redux/eventPlaceSlice';
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
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const dispatch = useDispatch();
  const { routeTo } = useRouter();

  useEffect(() => {
    if (eventInfoData && id) {
      setEventInfo(eventInfoData);
      if (eventInfoData.likeId) {
        setIsLike(true);
      } else {
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

  console.log(eventInfo);

  const images = eventInfo?.images.map((image) => baseUrl + image);

  const handleLikeButton = async () => {
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
  };

  return (
    <PageWrapper>
      <TopSectionWrapper>
        <TopSection>
          <ImgSection>
            <ImageSlider images={images as string[]} />
            <HeartButtonWrapper onClick={() => setIsLike((prev) => !prev)}>
              <HeartButton checked={isLike} onClick={handleLikeButton} />
              {/* TODO: 좋아요값 서버에서 가져오기 */}
              <LikeNum>{eventInfo?.likeCount}</LikeNum>
            </HeartButtonWrapper>
            <BookmarkButton
              checked={isBookmark}
              onClick={() => {
                setIsBookmark((prev) => !prev);
              }}
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
            <FixedRating score={4.5} marginB="10px" className="detailinfo" />
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

            {/* TODO: 나중에 평균 별점값 받아오기 */}
          </InfoSection>
          <TabSection>
            <InfoButton
              onClick={() => {
                handleTabClick('info');
              }}
              currentTab={currentTab}
              tabType="info"
            >
              Info
            </InfoButton>
            <MapButton
              onClick={() => {
                handleTabClick('map');
              }}
              currentTab={currentTab}
              tabType="map"
            >
              Map
            </MapButton>
            <ReviewButton
              onClick={() => {
                handleTabClick('review');
              }}
              currentTab={currentTab}
              tabType="review"
            >
              Review
            </ReviewButton>
          </TabSection>
        </TopSection>
      </TopSectionWrapper>
      <AddReviewButton
        type="button"
        onClick={() => routeTo(`/review/edit/${id}`)}
      >
        리뷰 작성
      </AddReviewButton>
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
