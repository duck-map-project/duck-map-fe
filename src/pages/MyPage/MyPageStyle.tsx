import styled from 'styled-components';

import px2vw from '../../utils/px2vw';

export const Main = styled.main`
  display: flex;
  width: 100%;
  padding: 0 ${px2vw(142)};
  margin: 0 auto;
`;

export const SideSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
`;

export const ProfileWrapper = styled.article`
  text-align: center;
  margin-bottom: 34px;
`;

export const ProfileImg = styled.img`
  width: 161px;
  height: 161px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const Username = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 700;
`;
