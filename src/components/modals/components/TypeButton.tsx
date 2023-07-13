import styled from 'styled-components';

import { artistType } from '../../../types/artistsType';

type propsType = {
  data: artistType;
  selected: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type groupType = {
  type: string;
  selected: boolean;
};

const TypeButton = ({ data, onChange, selected }: propsType) => {
  return (
    <>
      <TypeLabel
        htmlFor={data.id.toString()}
        type={data.type}
        selected={selected}
      >
        {data.type}
      </TypeLabel>
      <StyledInput
        type="radio"
        id={data.id.toString()}
        name="artistType"
        value={data.id.toString()}
        onChange={onChange}
      />
    </>
  );
};

export default TypeButton;

const TypeLabel = styled.label<groupType>`
  width: 130px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 4.4px 4.4px 0px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  ${(props) =>
    props.selected
      ? `
      background-color: #f8f8fa;
      border: 2px solid var(--line-black);
     `
      : `
      color: #8F9196;
      border: 2.056px solid #8B8E97;
      background: #EDEDED;
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
