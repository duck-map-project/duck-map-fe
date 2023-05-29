import React from 'react';
import { styled } from 'styled-components';

import logo from '../assets/logo.svg';
import { useRouter } from '../hooks/useRouter';
import { TextButton } from '../pages/mainPage/MainStyle';

import Dropdown from './Dropdown';

export const HeaderStyle = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 70px 53.8px 18px;
`;

export const Logo = styled.img`
  width: 200px;
  cursor: pointer;
`;

export const MenuButton = styled(TextButton)`
  margin-right: 40px;
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
            src="https://i.pinimg.com/564x/f6/bb/3d/f6bb3d066a4b0066689e47cdec0cf3c0.jpg"
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
