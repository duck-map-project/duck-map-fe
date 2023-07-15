import { Route, Routes } from 'react-router-dom';

import Bookmark from './components/Bookmark';
import Like from './components/Like';
import Review from './components/Review';
import {
  Main,
  SideSection,
  ProfileWrapper,
  ProfileImg,
  Username,
  ContentSection,
  ContentWrapper,
} from './MyPageStyle';
import SideBar from './SideBar';

const MyPage = () => {
  const testImg =
    'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';
  return (
    <Main>
      <SideSection>
        <ProfileWrapper>
          <ProfileImg src={testImg} />
          <Username>닉네임</Username>
        </ProfileWrapper>
        <SideBar />
      </SideSection>
      <ContentSection>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Bookmark />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="like" element={<Like />} />
            <Route path="myreview" element={<Review />} />
          </Routes>
        </ContentWrapper>
      </ContentSection>
    </Main>
  );
};

export default MyPage;
