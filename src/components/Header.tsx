import React from 'react';
import { styled } from 'styled-components';

import defaultImage from '../assets/logo-icon.png';
import logo from '../assets/logo.svg';
import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from '../hooks/useRouter';
import { TextButton } from '../pages/mainPage/MainStyle';
import px2vw from '../utils/px2vw';

import Dropdown from './Dropdown';

export const HeaderStyle = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px2vw(8)} ${px2vw(70)} ${px2vw(53.8)} ${px2vw(18)};
`;

export const Logo = styled.img`
  width: 200px;
  cursor: pointer;
`;

export const MenuButton = styled(TextButton)`
  margin-right: ${px2vw(40)};
`;

export const RightSection = styled.section`
  display: flex;
  align-items: center;
`;

export const ProfileDropdown = styled.div`
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000;
  flex-shrink: 0;
`;

interface HeaderProps {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  profileRef: React.RefObject<HTMLImageElement>;
  profileModal: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setProfileModal,
  profileRef,
  profileModal,
}) => {
  const auth = useAuthContext();
  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      routeTo('/signin');
      return;
    }
    setProfileModal((prev) => !prev);
  };
  const DropdwonLoginList = ['마이페이지', '로그아웃'];
  const { routeTo } = useRouter();
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
        <MenuButton
          onClick={() => {
            routeTo('/event');
          }}
        >
          이벤트
        </MenuButton>
        <MenuButton>리뷰</MenuButton>
        <ProfileDropdown>
          <ProfileImg
            src={auth?.user?.image || defaultImage}
            alt="Profile"
            onClick={handleProfileClick}
            ref={profileRef}
          />
          {profileModal ? (
            <Dropdown lists={DropdwonLoginList} setClicked={setProfileModal} />
          ) : null}
        </ProfileDropdown>
      </RightSection>
    </HeaderStyle>
  );
};

export default Header;
