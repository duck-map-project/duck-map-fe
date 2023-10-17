import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import defaultImage from '../../assets/user-profile.svg';
import { useGetUserInfoQuery } from '../../features/auth/services/authApiSlice';

import Bookmark from './Bookmark/Bookmark';
import Event from './Event/Event';
import Like from './Like/Like';
import ChangePassword from './Password/ChangePassword';
import EditProfile from './Profile/EditProfile';
import Review from './Review/Review';
import SideBar from './SideBar/SideBar';
import {
  Main,
  SideSection,
  ProfileWrapper,
  ProfileImg,
  Username,
  ContentSection,
  ContentWrapper,
} from './style';

const MyPage = () => {
  const { data: userData } = useGetUserInfoQuery();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const username = userData?.username;

  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (userData?.userProfile) {
      if (userData.userProfile === '/images/null') {
        setUserProfile(defaultImage);
        return;
      }
      const url = baseUrl + userData.userProfile;
      setUserProfile(url);
    }
  }, [userData]);

  return (
    <Main>
      <SideSection>
        <ProfileWrapper>
          <ProfileImg src={userProfile} />
          <Username>{username}</Username>
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
            <Route path="myevent" element={<Event />} />
            <Route path="edit_profile" element={<EditProfile />} />
            <Route path="change_password" element={<ChangePassword />} />
          </Routes>
        </ContentWrapper>
      </ContentSection>
    </Main>
  );
};

export default MyPage;
