import { useState } from 'react';

import MyBookmark from './MyBookmark';
import MyEvent from './MyEvent';
import MyInfoEdit from './MyInfoEdit';
import MyLike from './MyLike';
import {
  PageWrapper,
  InfoSection,
  ProfileImg,
  MyPageUl,
  MyPageLi,
  EditSection,
} from './MyPageStyle';
import MyReview from './MyReview';

  const MyPage = () => {
    type CurrentType = 'bookmark' | 'like' | 'event' | 'review' | 'infoedit';

    const [currentTab, setCurrentTab] = useState<CurrentType>('bookmark');

    const handleTabClick = (tab: CurrentType) => {
      setCurrentTab(tab);
    };

    return (
      <PageWrapper>
        <InfoSection>
          <ProfileImg
            alt="사용자 프로필"
            src="https://i.pinimg.com/736x/07/67/a9/0767a97903445549adcb066bb9ee74e3.jpg"
          />
          <MyPageUl>
            <MyPageLi
              onClick={() => {
                handleTabClick('bookmark');
              }}
            >
              북마크
            </MyPageLi>
            <MyPageLi
              onClick={() => {
                handleTabClick('like');
              }}
            >
              좋아요
            </MyPageLi>
            <MyPageLi
              onClick={() => {
                handleTabClick('event');
              }}
            >
              나의 이벤트
            </MyPageLi>
            <MyPageLi
              onClick={() => {
                handleTabClick('review');
              }}
            >
              나의 리뷰
            </MyPageLi>
            <MyPageLi
              onClick={() => {
                handleTabClick('infoedit');
              }}
            >
              회원 정보 수정
            </MyPageLi>
          </MyPageUl>
        </InfoSection>
        <EditSection>
          {/* 북마크/좋아요/이벤트/리뷰/회원정보 수정 등의 페이지로 이동시마다 여기만 변경 */}

          {currentTab === 'bookmark' ? (
            <MyBookmark />
          ) : currentTab === 'like' ? (
            <MyLike />
          ) : currentTab === 'event' ? (
            <MyEvent />
          ) : currentTab === 'review' ? (
            <MyReview />
          ) : currentTab === 'infoedit' ? (
            <MyInfoEdit />
          ) : null}
        </EditSection>
      </PageWrapper>
    );
  };

export default MyPage;
