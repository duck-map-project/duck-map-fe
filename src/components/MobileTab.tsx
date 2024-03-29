import { useSelector } from 'react-redux';
import styled from 'styled-components';

import event from '../assets/event.svg';
import home from '../assets/home.svg';
import review from '../assets/talk.svg';
import mypage from '../assets/user.svg';
import {
  selectCurrentRole,
  selectCurrentUser,
} from '../features/auth/services/authSlice';
import { useRouter } from '../hooks/useRouter';
import media from '../utils/mediaQuery';

const MobileTab = () => {
  const { routeTo } = useRouter();
  const user = useSelector(selectCurrentUser);
  const userRole = useSelector(selectCurrentRole);

  const onClickHome = () => {
    routeTo('/');
  };

  const onClickMypage = () => {
    if (!user) {
      routeTo('/signin');
    } else if (user && userRole === 'ADMIN') {
      routeTo('/managepage');
    } else if (user && userRole === 'USER') {
      routeTo('/mypage');
    }
  };

  const onClickEvent = () => {
    routeTo('/event');
  };

  const onClickReview = () => {
    routeTo('/review');
  };

  return (
    <TabWrapper>
      <IconWrapper onClick={onClickHome}>
        <img src={home} />
        <IconText>HOME</IconText>
      </IconWrapper>
      <IconWrapper onClick={onClickMypage}>
        <UserIcon src={mypage} />
        <IconText>MY</IconText>
      </IconWrapper>
      <IconWrapper onClick={onClickEvent}>
        <EventIcon src={event} />
        <IconText>EVENT</IconText>
      </IconWrapper>
      <IconWrapper onClick={onClickReview}>
        <ReviewIcon src={review} />
        <IconText>REVIEW</IconText>
      </IconWrapper>
    </TabWrapper>
  );
};

export default MobileTab;

const TabWrapper = styled.section`
  display: none;
  ${media.mobile`
    
  
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 34px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 66px;
  padding: 10px 27px;
  background-color: white;
  z-index: 99;
  cursor: pointer;
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 4px;
    top: 0;
    background-color: #c3bef0;
    border-top: 1px solid var(--line-black);
    border-bottom: 1px solid var(--line-black);
  }
  `}
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const UserIcon = styled.img`
  position: relative;
  top: -2px;
`;

const EventIcon = styled.img`
  position: relative;
  top: -2px;
  left: -2px;
`;

const ReviewIcon = styled.img`
  position: relative;
  top: -2px;
`;

const IconText = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
`;
