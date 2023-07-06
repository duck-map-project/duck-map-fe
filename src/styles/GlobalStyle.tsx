import { createGlobalStyle } from 'styled-components';

import font from './font';
import reset from './reset';

const GlobalStyle = createGlobalStyle`

:root {
--gradient: linear-gradient(180deg, #C8B6FF 0%, #E7C6FF 50%, #FFD6FF 100%);
--pink: #E7C6FF;
--purple: #C8B6FF;
--light-purple: #E7DFFF;
--blue-purple: #B8C0FF;
--blue: #BBD0FF;
--disabled: #D9D9D9;
--background-disabled: rgba(224, 224, 224, 0.7);
--yellow: #FFC700;
--red: #FF0000;
--white: #FFFFFF;
--yellow: #FFFDC7;
}

${reset}
${font}

* {
  box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    font-size: 1.6rem;
    line-height: 1.25;
    font-family: 'SpoqaHanSansNeo';
    font-weight: 400;
}

button {
  cursor: pointer;
}
`;

export default GlobalStyle;
