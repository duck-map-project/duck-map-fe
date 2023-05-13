import { css } from 'styled-components';

import SpoqaHanSansNeoBold from '../fonts/SpoqaHanSansNeo-Bold.woff';
import SpoqaHanSansNeoLight from '../fonts/SpoqaHanSansNeo-Light.woff';
import SpoqaHanSansNeoMedium from '../fonts/SpoqaHanSansNeo-Medium.woff';
import SpoqaHanSansNeoRegular from '../fonts/SpoqaHanSansNeo-Regular.woff';

const font = css`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaHanSansNeoBold}) format('woff');
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaHanSansNeoLight}) format('woff');
    font-style: normal;
    font-weight: '300';
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaHanSansNeoMedium}) format('woff');
    font-style: normal;
    font-weight: '500';
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${SpoqaHanSansNeoRegular}) format('woff');
    font-style: normal;
    font-weight: 400;
  }
`;

export default font;
