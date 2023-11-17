import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

export const SideSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  ${media.mobile`
    width: 90%;
    margin: 0 27px;
  `}
`;

export const ProfileWrapper = styled.article`
  margin-bottom: 34px;
  text-align: center;
  ${media.mobile`
    display: none;
  `}
`;

export const ProfileImg = styled.img`
  width: 161px;
  height: 161px;
  margin-bottom: 10px;
  border: 2px solid var(--line-black);
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 700;
`;
