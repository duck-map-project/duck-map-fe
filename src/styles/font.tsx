import { css } from 'styled-components';

import RobotoBold from '../fonts/Roboto-Bold-webfont.woff';
import RobotoRegular from '../fonts/Roboto-Regular-webfont.woff';
import SuiteBold from '../fonts/SUITE-Bold.woff2';
import SuiteRegular from '../fonts/SUITE-Regular.woff2';

const font = css`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold}) format('woff');
    font-style: normal;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('woff');
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'Suite';
    src: url(${SuiteBold}) format('woff2');
    font-style: normal;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Suite';
    src: url(${SuiteRegular}) format('woff2');
    font-style: normal;
    font-weight: 400;
  }
`;

export default font;
