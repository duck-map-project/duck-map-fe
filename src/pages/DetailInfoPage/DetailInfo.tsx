import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import FixedRating from '../../components/FixedRating';
import { TextBox, TextBoxWithTitle } from '../../components/TextBoxs';
import { useGetEventByIdQuery } from '../../redux/eventApiSlice';
import { setPlace } from '../../redux/eventPlaceSlice';
import { EventData } from '../../types/eventService';

import {
  ImgSection,
  EventImg,
  PageWrapper,
  TopSectionWrapper,
  TopSection,
  InfoSection,
  ImgNumMarkWrapper,
  ImgNumMarkCirclePurple,
  ImgNumMarkCircle,
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
import MapSection from './MapSection';
import ReviewSection from './ReviewSection';
import TwitterInfoSection from './TwitterInfoSection';

const DetailInfo = () => {
  type CurrentType = 'info' | 'map' | 'review';
  // TODO: 예시 이미지 삭제하기
  const testImg = [
    'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80',
  ];

  const [currentTab, setCurrentTab] = useState<CurrentType>('info');

  const handleTabClick = (tab: CurrentType) => {
    setCurrentTab(tab);
  };

  const [currentImg, setCurrentImg] = useState(0);
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
  console.log(eventInfo);

  return (
    <PageWrapper>
      <TopSectionWrapper>
        <TopSection>
          {/* TODO: 이미지 슬라이드 기능 추가 */}
          <ImgSection>
            <EventImg url={testImg[currentImg]} />
            <ImgNumMarkWrapper>
              {testImg.map((_, i) =>
                i === currentImg ? (
                  <ImgNumMarkCirclePurple
                    key={i}
                    onClick={() => setCurrentImg(i)}
                  />
                ) : (
                  <ImgNumMarkCircle key={i} onClick={() => setCurrentImg(i)} />
                )
              )}
            </ImgNumMarkWrapper>
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
              <CopyButton>복사</CopyButton>
            </CopyTextBoxWrapper>
            <CopyTextBoxWrapper>
              <TextBoxWithTitle title="주소">
                {eventInfo?.address}
              </TextBoxWithTitle>
              <CopyButton>복사</CopyButton>
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
