import { useParams } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import staricon from '../../assets/icons/starIcon.svg';
import { useRouter } from '../../hooks/useRouter';

import {
  ItemWrapper,
  EventImg,
  StyledMain,
  StyledMemo,
  Logo,
  Content,
  UserProfile,
  ProfileImg,
  Username,
  Foldername,
  EventName,
  EventWrapper,
  MainPageBtn,
} from './BookmarkShareStyle';

type EventItemProps = {
  image: string;
  storeName: string;
};

const testImg =
  'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';

const BookmarkEventItem = ({ image, storeName }: EventItemProps) => {
  //이 id 값이 폴더의 id 값. 이걸로 요청.

  return (
    <ItemWrapper>
      <EventImg src={image} />
      <EventName>{storeName}</EventName>
    </ItemWrapper>
  );
};

const BookmarkShare = () => {
  //북마크 id를 params의 /:id로 받아오자
  const { id } = useParams();
  console.log(id);
  const { routeTo } = useRouter();
  const onClickGoMainBtn = () => {
    routeTo('/');
  };
  return (
    <StyledMain>
      <StyledMemo>
        <Logo>
          <img alt="대동덕지도" src={logo} />
        </Logo>
        <Content>
          <UserProfile>
            <ProfileImg alt="유저 프로필" src={testImg} />
            <Username>누구누구 님의 프로필</Username>
          </UserProfile>
          <Foldername>
            <img src={staricon} />
            <span>북마크 폴더 이름</span>
          </Foldername>
          <EventWrapper>
            {/* 여기에서 border-top 으로 styling*/}
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
            <BookmarkEventItem image={testImg} storeName="이벤트이름" />
          </EventWrapper>
          <MainPageBtn type="button" onClick={onClickGoMainBtn}>
            메인 페이지로 이동
          </MainPageBtn>
        </Content>
      </StyledMemo>
    </StyledMain>
  );
};

export default BookmarkShare;

// export const ItemWrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 142px;
//   gap: 10px;
// `;

// export const EventImg = styled.img`
//   width: 132px;
//   height: 109px;
//   border: 2px solid var(--line-black);
//   border-radius: 20px;
// `;

// export const EventName = styled.span`
//   width: 132px;
//   padding: 5px 6px;
//   font-size: 14px;
//   font-weight: 700;
//   text-align: center;
//   border: 2px solid #4e5761;
//   border-radius: 20px;
//   background-color: #f8f8fa;
//   //말줄임
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// export const StyledMain = styled.main`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const StyledMemo = styled.article`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
//   width: 874px;
//   height: 812px;
//   padding: 0 90px;
//   margin: 56px auto;
//   background-image: url(${memofront});
//   background-repeat: no-repeat;
//   background-position: center center;
//   &::before {
//     position: absolute;
//     display: block;
//     content: '';
//     width: 100%;
//     height: 100%;
//     top: -16px;
//     right: -16px;
//     background-image: url(${memoback});
//     background-repeat: no-repeat;
//     background-position: center center;
//     z-index: -9;
//   }
//   &::after {
//     position: absolute;
//     display: block;
//     content: '';
//     width: 100%;
//     height: 100%;
//     top: -32px;
//     right: -32px;
//     background-image: url(${memoback});
//     background-repeat: no-repeat;
//     background-position: center center;
//     z-index: -19;
//   }
// `;

// export const Logo = styled.h4`
//   padding: 7px 51px;
//   margin-top: 34px;
//   border: 2px solid var(--line-black);
//   border-radius: 80px;
//   background-color: #f8f8fa;
// `;

// export const Content = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   height: 75%;
//   margin-top: 26px;
//   padding: 16px;
//   border: 2px solid var(--line-black);
//   background-color: #fbf8fa;
// `;

// export const UserProfile = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

// export const ProfileImg = styled.img`
//   width: 70px;
//   height: 70px;
//   border: 2px solid var(--line-black);
//   border-radius: 50%;
//   object-fit: cover;
// `;

// export const Username = styled.span`
//   font-size: 20px;
//   font-weight: 700;
//   line-height: normal;
// `;

// export const Foldername = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px;
//   margin-top: 14px;
//   font-size: 20px;
//   font-weight: 700;
//   line-height: normal;
// `;

// export const EventWrapper = styled.article`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   row-gap: 12px;
//   width: 474px;
//   padding: 16px;
//   border-top: 2px solid var(--line-black);
//   overflow-y: scroll;
// `;

// export const MainPageBtn = styled.button`
//   padding: 14px 60px;
//   margin-top: 16px;
//   font-size: 24px;
//   font-weight: 700;
//   line-height: normal;
//   border: 2px solid var(--line-black);
//   border-radius: 50px;
//   background-color: #defcf9;
// `;
