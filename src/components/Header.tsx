import React from 'react';
import { styled } from 'styled-components';

import iconPencil from '../assets/icon-pencil.svg';
import iconPin from '../assets/icon-pin.svg';
import logo from '../assets/logo.svg';
import defaultImage from '../assets/user-profile.svg';
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
  padding: ${px2vw(22)} ${px2vw(142)} ${px2vw(22)};
`;

export const Logo = styled.img`
  width: 249px;
  cursor: pointer;
`;

export const MenuButton = styled(TextButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 36px;
  font-weight: 700;
  font-size: 18px;
  margin-right: ${px2vw(18)};
  border: 2px solid #1e232c;
  border-radius: 3px;
  background-color: var(--yellow);
  box-shadow: 3px 3px 0px 0px #00000040;
  &:nth-child(2) {
    justify-content: flex-start;
    padding-left: 11.5px;
  }
`;

const MenuButtonIcon = styled.img`
  height: 22px;
  margin-right: 8px;
`;

const ReviewButtonIcon = styled(MenuButtonIcon)`
  margin-right: 6px;
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
  border: ${(props) => (props.src === defaultImage ? '' : '2px solid #1e232c')};
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
    if (!auth?.isLogin) {
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
          <MenuButtonIcon src={iconPin} />
          Event
        </MenuButton>
        <MenuButton>
          <ReviewButtonIcon src={iconPencil} />
          Review
        </MenuButton>
        <ProfileDropdown>
          <ProfileImg
            src={defaultImage}
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
