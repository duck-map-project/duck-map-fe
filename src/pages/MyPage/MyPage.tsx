import { useState } from 'react';

import Bookmark from './Bookmark';
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
  const [selectedItem, setSelectedItem] = useState('bookmark');
  const testImg =
    'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

  let content;
  if (selectedItem === 'bookmark') {
    content = <Bookmark />;
  }
  return (
    <Main>
      <SideSection>
        <ProfileWrapper>
          <ProfileImg src={testImg} />
          <Username>닉네임</Username>
        </ProfileWrapper>
        <SideBar state={selectedItem} setState={setSelectedItem} />
      </SideSection>
      <ContentSection>
        <ContentWrapper>{content}</ContentWrapper>
      </ContentSection>
    </Main>
  );
};

export default MyPage;
