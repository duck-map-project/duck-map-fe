import styled from 'styled-components';

import media from '../../utils/mediaQuery';
import px2vw from '../../utils/px2vw';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  gap: 32px;
  width: 100%;
  padding: 0 ${px2vw(142)};
  margin: 0 auto;
  ${media.mobile`
    flex-direction: column;
    align-items: center;
    padding: 0 ${px2vw(27)};
  `}
`;
