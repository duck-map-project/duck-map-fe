import { useState } from 'react';

import coffecupActive from '../../assets/coffee-cup-active.svg';
import coffecup from '../../assets/coffee-cup-disabled.svg';
import mapActive from '../../assets/map-active.svg';
import map from '../../assets/map-disabled.svg';
import Button from '../../components/Button';
import FixedRating from '../../components/FixedRating';

import {
  ImgSection,
  EventImg,
  PageWrapper,
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
  TabButton,
  TabInfoImg,
  TabMapImg,
} from './DetailInfoStyle';

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

  return (
    <PageWrapper>
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
          {/* TODO: 세희님 텍스트 박스 컴포넌트 div 완성되면 바꾸기 */}
          <div>상호명</div>
          <div>이벤트 기간</div>
          <div>주소</div>
          <Button color="primary" size="mid">
            복사
          </Button>
          <div>영업 시간</div>
          <div>해시태그</div>
          <Button color="primary" size="mid">
            복사
          </Button>
          {/* TODO: 나중에 평균 별점값 받아오기 */}
          <FixedRating score={4.5} />
        </InfoSection>
      </TopSection>
      <TabSection>
        <TabButton
          onClick={() => {
            handleTabClick('info');
          }}
          currentTab={currentTab}
          tabType="info"
        >
          <TabInfoImg src={currentTab === 'info' ? coffecupActive : coffecup} />
          Info
        </TabButton>
        <TabButton
          onClick={() => {
            handleTabClick('map');
          }}
          currentTab={currentTab}
          tabType="map"
        >
          <TabMapImg src={currentTab === 'map' ? mapActive : map} />
          Map
        </TabButton>
        <TabButton
          onClick={() => {
            handleTabClick('review');
          }}
          currentTab={currentTab}
          tabType="review"
        >
          Review
        </TabButton>
      </TabSection>
    </PageWrapper>
  );
};

export default DetailInfo;
