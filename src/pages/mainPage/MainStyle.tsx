import { styled } from 'styled-components';

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 47px 53.8px 18px;
`;

export const Logo = styled.img`
  width: 200px;
`;

export const TextButton = styled.button`
  font-size: 1.6rem;
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

export const MainSection = styled.main`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: flex-end;
`;

export const MapSection = styled.section`
  width: 100%;
  height: 496px;
  background-color: #000;
  margin-bottom: 17px;
`;

export const ViewReviews = styled.section`
  overflow: hidden;
  position: relative;
  padding-top: 19px;
`;

export const MoreButton = styled(TextButton)`
  position: absolute;
  top: 0;
  right: 10px;
`;

export const Reviews = styled.section`
  display: flex;
`;

export const ReviewsItem = styled.div`
  width: 392px;
  height: 248px;
  background-color: #d9d9d9;
  flex-shrink: 0;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;
