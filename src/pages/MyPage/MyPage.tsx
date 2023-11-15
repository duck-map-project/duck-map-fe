import { useState, useEffect } from 'react';

import defaultImage from '../../assets/user-profile.svg';
import { useGetUserInfoQuery } from '../../features/auth/services/authApiSlice';

import ContentSection from './ContentSection/ContentSection';
import { Main } from './MyPageStyle';
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
      <ContentSection />
    </Main>
  );
};

export default MyPage;
