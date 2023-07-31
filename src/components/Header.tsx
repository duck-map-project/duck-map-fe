import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import iconPencil from '../assets/icon-pencil.svg';
import iconPin from '../assets/icon-pin.svg';
import settingIcon from '../assets/icons/setting.svg';
import iconLogin from '../assets/login-icon.svg';
import logo from '../assets/logo.svg';
import defaultImage from '../assets/user-profile.svg';
import { useRouter } from '../hooks/useRouter';
import { TextButton } from '../pages/mainPage/MainStyle';
import { useLogoutMutation } from '../redux/auth/authApiSlice';
import { logOut, selectCurrentUser } from '../redux/auth/authSlice';
import { toggleGroup } from '../redux/manageModalSlice';
import { toggleArtist } from '../redux/manageModalSlice';
import { toggleCategory } from '../redux/manageModalSlice';
import { toggleArtistType } from '../redux/manageModalSlice';
import px2vw from '../utils/px2vw';

export const HeaderStyle = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px2vw(22)} ${px2vw(142)} ${px2vw(22)};
`;

export const Logo = styled.img`
  width: 249px;
  cursor: pointer;
`;

export const MenuButton = styled(TextButton)`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  height: 36px;
  font-weight: 700;
  font-size: 18px;
  margin-right: ${px2vw(18)};
  border: 2px solid #1e232c;
  border-radius: 3px;
  background-color: var(--yellow);
  box-shadow: 3px 3px 0px 0px #00000040;
  text-align: center;
  &:nth-child(3) {
    margin-right: ${px2vw(24)};
  }
`;

const MenuButtonIcon = styled.img`
  height: 22px;
  margin-right: 8px;
`;

export const RightSection = styled.section`
  display: flex;
  align-items: center;
`;

export const ProfileDropdown = styled.div`
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(0deg, #f8f8fa, #f8f8fa),
    linear-gradient(0deg, #1e232c, #1e232c);
  border: 2px solid #1e232c;
  flex-shrink: 0;
`;

const Header: React.FC = ({}) => {
  const { currentPath, routeTo } = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleProfileClick = () => {
    if (user) {
      routeTo('/mypage');
    }
  };

  const handleAuthButton = () => {
    if (user) {
      logout({});

      dispatch(logOut({}));
    } else {
      routeTo('/signin');
    }
  };

  const handleEventClick = () => {
    routeTo('/event');
  };
  const handleReviewClick = () => {
    console.log('리뷰!');
  };
  const handleGroupClick = () => {
    dispatch(toggleGroup());
  };
  const handleArtistClick = () => {
    dispatch(toggleArtist());
  };
  const handleArtistTypeClick = () => {
    dispatch(toggleArtistType());
  };
  const handleCategoryClick = () => {
    dispatch(toggleCategory());
  };

  const publicMenu = [
    { id: 1, title: 'Event', icon: iconPin, handler: handleEventClick },
    { id: 2, title: 'Review', icon: iconPencil, handler: handleReviewClick },
  ];
  const managePageMenu = [
    {
      id: 0,
      title: '그룹 등록',
      icon: settingIcon,
      handler: handleGroupClick,
    },
    {
      id: 1,
      title: '아티스트 등록',
      icon: settingIcon,
      handler: handleArtistClick,
    },
    {
      id: 2,
      title: '아티스트 타입 등록',
      icon: settingIcon,
      handler: handleArtistTypeClick,
    },
    {
      id: 3,
      title: '카테고리 등록',
      icon: settingIcon,
      handler: handleCategoryClick,
    },
  ];

  let content;

  if (currentPath === '/managepage' || currentPath === '/managePage') {
    content = managePageMenu.map((menu) => (
      <MenuButton key={menu.id} onClick={menu.handler}>
        <MenuButtonIcon src={menu.icon} />
        {menu.title}
      </MenuButton>
    ));
  } else {
    content = publicMenu.map((menu) => (
      <MenuButton key={menu.id} onClick={menu.handler}>
        <MenuButtonIcon src={menu.icon} />
        {menu.title}
      </MenuButton>
    ));
  }

  return (
    <HeaderStyle>
      <Logo
        src={logo}
        alt="Logo"
        onClick={() => {
          routeTo('/');
        }}
      />
      <RightSection>
        {content}
        <MenuButton onClick={handleAuthButton}>
          <MenuButtonIcon src={iconLogin} />
          {user ? 'Logout' : 'Login'}
        </MenuButton>
        <ProfileDropdown>
          <ProfileImg
            src={
              user?.userProfile && user?.userProfile !== '/images/null'
                ? `${baseUrl}${user.userProfile}`
                : defaultImage
            }
            alt="Profile"
            onClick={handleProfileClick}
          />
        </ProfileDropdown>
      </RightSection>
    </HeaderStyle>
  );
};

export default Header;
