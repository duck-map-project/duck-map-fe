import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import defaultImage from '../../assets/user-profile.svg';
import { useGetUserInfoQuery } from '../../features/auth/services/authApiSlice';

import Bookmark from './Bookmark/Bookmark';
import ChangePassword from './ChangePassword/ChangePassword';
import EditProfile from './EditProfile/EditProfile';
import Event from './Event/Event';
import Like from './Like/Like';
import { Main, ContentSection, ContentWrapper } from './MyPageStyle';
import Review from './Review/Review';
import SideSection from './SideSection/SideSection';

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
      <SideSection profile={userProfile} username={username} />
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
