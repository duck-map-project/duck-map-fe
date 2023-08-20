import { createGlobalStyle } from 'styled-components';

import font from './font';
import reset from './reset';

const GlobalStyle = createGlobalStyle`

:root {
  --font-black: #1E232C;
  --font-grey1: #8391A1;
  --font-grey2: #8F9196;
  --font-grey3: #999999;
  --bg1: #F1F1F5;
  --bg2: #F8F8FA;
  --line-black: #1E232C;
  --line-grey1: #DBDBDB;
  --line-grey2: #EDEDED;
  --theme1: #CBB8FF;
  --theme2: #FDD5FF;
  --error: #FF3120;
  --complete: #92E5FF;
  --white: #FFFFFF; 
  --yellow: #FFFDC7;
  
  
  /* --gradient: linear-gradient(180deg, #C8B6FF 0%, #E7C6FF 50%, #FFD6FF 100%);
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
*/
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
    font-family: 'Suite';
    font-weight: 400;
  background-image:
    linear-gradient(90deg, #ebd9fb 0px, #ebd9fb 1px, transparent 1px, transparent 99px,  transparent 100px),
    linear-gradient(transparent 0px, transparent 5px, #ffeefc 5px, #ffeefc 95px, transparent 95px, transparent 100px),
    linear-gradient(transparent 0px, transparent 1px, #ffeefc 1px, #ffeefc 99px, transparent 99px, transparent 100px),
    linear-gradient(#ebd9fb, #ebd9fb);
  background-size:78px 100%, 100% 78px, 100% 5px, 5px 100%;
  
}

button {
  cursor: pointer;
}

.sr-only {
position: absolute;
overflow: hidden;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
border: 0;
clip: rect(0,0,0,0);
}
`;

export default GlobalStyle;
