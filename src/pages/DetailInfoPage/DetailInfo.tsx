import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import FixedRating from '../../components/FixedRating';
import { TextBox, TextBoxWithTitle } from '../../components/TextBoxs';
import { useGetEventByIdQuery } from '../../redux/eventApiSlice';
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

  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: eventInfoData } = useGetEventByIdQuery(id as string);
  const [eventInfo, setEventInfo] = useState<EventData | undefined>(
    eventInfoData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventInfoData && id) {
      setEventInfo(eventInfoData);
      dispatch(
        setPlace({
          adress: [eventInfoData.address],
          storeName: [eventInfoData.storeName],
        })
      );
    }
  }, [eventInfoData]);

  const images = eventInfo?.images.map((image) => baseUrl + image);

  return (
    <PageWrapper>
      <TopSectionWrapper>
        <TopSection>
          <ImgSection>
            <ImageSlider images={images as string[]} />
            <HeartButtonWrapper onClick={() => setIsLike((prev) => !prev)}>
              <HeartButton checked={isLike} />
              {/* TODO: 좋아요값 서버에서 가져오기 */}
              <LikeNum>123</LikeNum>
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
            <FixedRating score={4.5} marginB="10px" />
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
      <AddReviewButton type="button">리뷰 작성</AddReviewButton>
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
