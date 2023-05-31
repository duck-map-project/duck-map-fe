import { styled } from 'styled-components';

import px2vw from '../../utils/px2vw';

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${px2vw(50)};
`;

export const TopSection = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: ${px2vw(20)};
  position: relative;
  & > fieldset {
    margin-top: 31px;
    flex-shrink: 0;
    margin-left: ${px2vw(42)};
  }
  & > div:last-child {
    margin-left: auto;
  }
`;

export const PreviewImg = styled.div<{ url?: string }>`
  width: 100%;
  max-width: 540px;
  height: 335px;
  border: 1px solid var(--blue-purple);
  background-image: url(${(props) => (props.url ? props.url : '')});
  background-color: ${(props) => (props.url ? '' : `var(--disabled)`)};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
  position: relative;
  & > label {
    position: absolute;
    bottom: 21px;
    right: 22px;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 406px;
  font-size: 1.6rem;
  padding: 31px 34px;
  border: 1px solid var(--blue-purple);
  border-radius: 5px;
  overflow-y: auto;
  resize: none;
`;
