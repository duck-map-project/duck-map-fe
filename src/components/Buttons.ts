import { styled } from 'styled-components';

import xIcon from '../assets/icon-pink-x.svg';

export const ImageDeleteButton = styled.button.attrs({ type: 'button' })`
  width: 42px;
  height: 42px;
  background-image: url(${xIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f8f8fa;
  border: 2.8px solid #1e232c;
  border-radius: 50%;
  box-shadow: 2.799999952316284px 2.799999952316284px 0px 0px #00000040;
  position: absolute;
  top: -14px;
  right: -14px;
`;
