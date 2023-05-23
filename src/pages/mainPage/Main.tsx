import { useState, useEffect, useRef } from 'react';

import logo from '../../assets/logo.svg';
import Billboard from '../../components/Billboard';
import Dropdown from '../../components/Dropdown';
import SortDropdown from '../../components/SortButton';

import {
  Header,
  Logo,
  MenuButton,
  RightSection,
  ProfileDropdown,
  ProfileImg,
  MainSection,
  MapSection,
  ViewReviews,
  MoreButton,
  Reviews,
  ReviewsItem,
} from './MainStyle';

const Main = () => {
  const [profileModal, setProfileModal] = useState(false);
  const DropdwonList: string[] = ['마이페이지', '로그아웃'];
  const profileRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setProfileModal((prev) => !prev);
  };

  return (
    <>
      <Billboard />
      <Header>
        <Logo src={logo} alt="Logo" />
        <RightSection>
          <MenuButton>이벤트</MenuButton>
          <MenuButton>리뷰</MenuButton>
          <ProfileDropdown>
            <ProfileImg
              src="https://i.pinimg.com/564x/f6/bb/3d/f6bb3d066a4b0066689e47cdec0cf3c0.jpg"
              alt="Profile"
              onClick={handleProfileClick}
              ref={profileRef}
            />
            {profileModal ? (
              <Dropdown lists={DropdwonList} setClicked={setProfileModal} />
            ) : null}
          </ProfileDropdown>
        </RightSection>
      </Header>
      <MainSection>
        <SortDropdown />
        <MapSection />
      </MainSection>
      <ViewReviews>
        <MoreButton>더보기</MoreButton>
        <Reviews>
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
          <ReviewsItem />
        </Reviews>
      </ViewReviews>
    </>
  );
};

export default Main;
