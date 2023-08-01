import { useState } from 'react';

import { ReactComponent as Checkicon } from '../../assets/icons/checkicon.svg';
import locationIcon from '../../assets/icons/location.svg';
import ChoiceArtistBar from '../../components/ChoiceArtistBar';
import FixedRating from '../../components/FixedRating';

import {
  ReviewItemWrapper,
  ReviewTitle,
  ReviewContent,
  EventName,
  ArtistName,
  Categories,
  ReviewImg,
  MainContent,
  ReviewWrapper,
  ScrollWrapper,
  Rating,
  Tab,
  TabWrapper,
} from './ReviewStyle';

type ReviewItemProps = {
  id: number;
  eventStoreName: string;
  artistName: string;
  score: number;
  reviewImage: string;
  content: string;
};

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const testText =
  '대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.';

const tabArray = [
  {
    id: 1,
    value: 'current',
    group: 'tab',
    text: '현재 진행중',
  },
  {
    id: 2,
    value: 'all',
    group: 'tab',
    text: '모두 보기',
  },
];

const ReviewItem = ({
  id,
  eventStoreName,
  artistName,
  score,
  reviewImage,
  content,
}: ReviewItemProps) => {
  const onClickReviewItem = () => {
    id;
    alert('상세리뷰로 이동!');
  };

  return (
    <ReviewItemWrapper onClick={onClickReviewItem}>
      <ReviewTitle>
        <img src={locationIcon} />
        <div>
          <EventName>{eventStoreName}</EventName>
          <ArtistName>{artistName}</ArtistName>
        </div>
      </ReviewTitle>
      <ReviewContent> {content} </ReviewContent>
      <Categories> #카테고리들 </Categories>
      <ReviewImg src={reviewImage} />
      <Rating>
        <FixedRating score={score} size="reviewItem" className="리뷰아이템" />
      </Rating>
    </ReviewItemWrapper>
  );
};

const Reviews = () => {
  const [selectedTab, setSelectedTab] = useState('current');

  const onClickTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  const tabContent = tabArray.map((data) => (
    <div key={data.id}>
      <Tab htmlFor={data.value} selected={data.value === selectedTab}>
        <Checkicon fill={data.value === selectedTab ? '#C3BEF0' : '#D2D2D2'} />
        {data.text}
      </Tab>
      <input
        type="radio"
        id={data.value}
        value={data.value}
        name={data.group}
        onChange={onClickTab}
        className="sr-only"
      ></input>
    </div>
  ));

  return (
    <>
      <ChoiceArtistBar />
      <MainContent>
        <TabWrapper>{tabContent}</TabWrapper>
        <ReviewWrapper>
          <ScrollWrapper>
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
            <ReviewItem
              id={1}
              eventStoreName={'가게이름'}
              artistName={'아티스트이름'}
              score={4}
              reviewImage={testImg}
              content={testText}
            />
          </ScrollWrapper>
        </ReviewWrapper>
      </MainContent>
    </>
  );
};

export default Reviews;
