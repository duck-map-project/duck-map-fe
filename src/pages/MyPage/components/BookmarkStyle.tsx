import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

export const BookmarkWrapper = styled.section`
  width: 100%;
  padding-right: 30px;
  ${media.mobile`
    padding-right: 8px;
  `}
`;
