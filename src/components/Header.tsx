import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

import iconPencil from '../assets/icon-pencil.svg';
import iconPin from '../assets/icon-pin.svg';
import arrow from '../assets/icons/arrowright.svg';
import book from '../assets/icons/book-pink.svg';
import setting from '../assets/icons/setting.svg';
import settingIcon from '../assets/icons/setting.svg';
import iconLogin from '../assets/login-icon.svg';
import logo from '../assets/logo.svg';
import defaultImage from '../assets/user-profile.svg';
import { useRouter } from '../hooks/useRouter';
import { TextButton } from '../pages/mainPage/MainStyle';
import { useLogoutMutation } from '../redux/auth/authApiSlice';
import {
  logOut,
  selectCurrentUser,
  selectCurrentRole,
} from '../redux/auth/authSlice';
import { toggleGroup } from '../redux/manageModalSlice';
import { toggleArtist } from '../redux/manageModalSlice';
import { toggleCategory } from '../redux/manageModalSlice';
import { toggleArtistType } from '../redux/manageModalSlice';
import media from '../utils/mediaQuery';
import px2vw from '../utils/px2vw';

import SortDropdown from './SortButton';

export const HeaderStyle = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px2vw(22)} ${px2vw(142)} ${px2vw(22)};
  ${media.mobile`
    padding: 7px 27px;
    
  `}
`;

export const Logo = styled.img`
  width: 249px;
  cursor: pointer;
  ${media.mobile`
  display: none;
  `}
`;

export const MobileLogo = styled.div`
  display: none;
  ${media.mobile`
  display: flex;
  align-items: center;
  &>img {
    width: 22px;
    transform: rotate(180deg);
    margin-right: 18px;
  }
  &>span{
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }
`}
`;

export const MenuButton = styled(TextButton)`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  height: 36px;
  margin-right: ${px2vw(18)};
  border: 2px solid #1e232c;
  border-radius: 3px;
  background-color: var(--yellow);
  box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  &:nth-child(3) {
    margin-right: ${px2vw(24)};
  }
  ${media.mobile`
  width: 40px;
  height: 22px;
  padding: 3px 12px;
  margin-right: 8px;
  border: 1.4px solid #1e232c;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);;
  &:nth-child(3) {
    margin-right: 12px;
  }
  `}
`;

const MenuButtonIcon = styled.img`
  height: 22px;
  margin-right: 8px;
  ${media.mobile`
    height: 14px;
    margin-right:0;
  `}
`;

const MenuButtonText = styled.span`
  font-weight: 700;
  font-size: 18px;
  ${media.mobile`
    display: none;
  `}
`;

export const RightSection = styled.section`
  display: flex;
  align-items: center;
  gap: 12px;
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
  object-fit: cover;
  ${media.mobile`
    width: 46px;
    height: 46px;
    border: 1.4px solid #1e232c;
  `}
`;

const Header: React.FC = ({}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const [, setParams] = useSearchParams();
  const { currentPath, routeTo } = useRouter();
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const user = useSelector(selectCurrentUser);
  const userRole = useSelector(selectCurrentRole);
  const [logout, { isError }] = useLogoutMutation();
  const [userProfile, setUserProfile] = useState<string | null>('');
  const [manageSort, setManageSort] = useState(false);
  const [manageSettingSort, setManageSettingSort] = useState(false);
  const [, setSortId] = useState<number | null>(null);

  useEffect(() => {
    if (user && user.userProfile !== '/images/null') {
      const url = baseUrl + user.userProfile;
      setUserProfile(url);
      return;
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const handleProfileClick = () => {
    if (user && userRole === 'ADMIN') {
      routeTo('/managepage');
    }
    if (user && userRole === 'USER') {
      routeTo('/mypage');
    }
  };

  const handleAuthButton = async () => {
    if (user) {
      logout({});
      if (isError) {
        alert('로그아웃 실패!');
        return;
      } else {
        dispatch(logOut({}));
        routeTo('/signin');
      }
    } else {
      routeTo('/signin');
    }
  };

  const handleEventClick = () => {
    routeTo('/event');
  };
  const handleReviewClick = () => {
    routeTo('/review');
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
      sort: '아티스트 목록',
      handler: () => {
        setParams({ sort: 'artist' });
      },
    },
    {
      id: 1,
      sort: '카테고리 목록',
      handler: () => {
        setParams({ sort: 'category' });
      },
    },
    {
      id: 2,
      sort: '아티스트타입 목록',
      handler: () => {
        setParams({ sort: 'artisttype' });
      },
    },
  ];
  managePageMenu;

  const managePageSettingMenu = [
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
    if (window.innerWidth <= 430) {
      content = (
        <>
          <SortDropdown
            className="manageLists"
            clicked={manageSort}
            setClicked={setManageSort}
            sortButtonRef={sortButtonRef}
            sortOptions={managePageMenu}
            setId={setSortId}
            icon={book}
            size={'manage'}
          />
          <SortDropdown
            className="manageLists"
            clicked={manageSettingSort}
            setClicked={setManageSettingSort}
            sortButtonRef={sortButtonRef}
            sortOptions={managePageSettingMenu.map((menu) => ({
              sort: menu.title,
              id: menu.id,
              handler: menu.handler,
            }))}
            setId={setSortId}
            icon={setting}
            size={'manage'}
          />
        </>
      );
    } else {
      content = managePageSettingMenu.map((menu) => (
        <MenuButton key={menu.id} onClick={menu.handler}>
          <MenuButtonIcon src={menu.icon} />
          <MenuButtonText>{menu.title}</MenuButtonText>
        </MenuButton>
      ));
    }
  } else {
    content = publicMenu.map((menu) => (
      <MenuButton key={menu.id} onClick={menu.handler}>
        <MenuButtonIcon src={menu.icon} />
        <MenuButtonText>{menu.title}</MenuButtonText>
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
      {currentPath !== '/' && (
        <MobileLogo
          onClick={() => {
            routeTo('/');
          }}
        >
          <img src={arrow} />
          <span>홈으로</span>
        </MobileLogo>
      )}
      <RightSection>
        {content}
        {currentPath === '/managepage' || (
          <MenuButton onClick={handleAuthButton}>
            <MenuButtonIcon src={iconLogin} />
            <MenuButtonText>{user ? 'Logout' : 'Login'}</MenuButtonText>
          </MenuButton>
        )}
        <ProfileDropdown>
          <ProfileImg
            src={userProfile || defaultImage}
            alt="Profile"
            onClick={handleProfileClick}
          />
        </ProfileDropdown>
      </RightSection>
    </HeaderStyle>
  );
};

export default Header;
