import { styled } from 'styled-components';

import logo from '../assets/logo.svg';

const SidebarWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 267px;
  height: 100vh;
  background: var(--white);
  z-index: 999;
  border: 5px solid var(--purple);
`;

const Logo = styled.img`
  width: 150px;
  margin: 30px auto;
`;

const SidebarList = styled.ul``;

const SidebarItem = styled.li`
  font-size: 14px;
  padding: 5px 0;
  padding-left: 27px;
  &:nth-child(n + 4) {
    padding-left: 37px;
  }
  &:hover {
    background: var(--purple);
    color: var(--white);
  }
`;

const SignButton = styled.button`
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  align-self: flex-end;
  margin-top: auto;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo src={logo} />
      <SidebarList>
        <SidebarItem>이벤트</SidebarItem>
        <SidebarItem>리뷰</SidebarItem>
        <SidebarItem>마이페이지</SidebarItem>
        <SidebarItem>북마크</SidebarItem>
        <SidebarItem>좋아요</SidebarItem>
        <SidebarItem>나의 이벤트</SidebarItem>
        <SidebarItem>나의 리뷰</SidebarItem>
        <SidebarItem>회원 정보</SidebarItem>
        <SidebarItem>탈퇴</SidebarItem>
      </SidebarList>
      {/* FIXME: 로그인 상태에 따라 TEXT 달라지게 */}
      <SignButton>로그인/로그아웃</SignButton>
    </SidebarWrapper>
  );
};

export default Sidebar;
