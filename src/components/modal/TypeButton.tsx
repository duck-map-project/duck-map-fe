import styled from 'styled-components';

import media from '../../utils/mediaQuery';

type propsType = {
  id: number;
  text: string;
  selected: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type groupType = {
  selected: boolean;
};

const TypeButton = ({ id, text, onChange, selected }: propsType) => {
  return (
    <>
      <TypeLabel htmlFor={id.toString()} selected={selected}>
        {text}
      </TypeLabel>
      <StyledInput
        type="radio"
        id={id.toString()}
        name="artistType"
        value={id.toString()}
        onChange={onChange}
      />
    </>
  );
};

export default TypeButton;

const TypeLabel = styled.label<groupType>`
  min-width: 130px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  ${(props) =>
    props.selected
      ? `
    background-color: #f8f8fa;
    border: 2px solid var(--line-black);
    box-shadow: 4.4px 4.4px 0px 0px rgba(0, 0, 0, 0.25);
     `
      : `
      color: #8F9196;
      border: 2.056px solid #8B8E97;
      background: #EDEDED;
      `}
  ${media.mobile`
    min-width: 58px;
    padding: 7px 10px;
    font-size: 10px;
    gap: 4px;
  `}
`;

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;
