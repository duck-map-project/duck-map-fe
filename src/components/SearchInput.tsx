import { styled } from 'styled-components';

import iconSearch from '../assets/icon-edit.svg';

export const SearchInputBox = styled.div`
position: relative;
width: 100%;
`;

const SearchSection = styled.input`
border: 1px solid #C8B6FF;
border-radius: 0.5rem;
padding: 11px 20px 11px 45px;
width: 500px;
`;

const Icon = styled.p`
position: absolute;
top: 8px;
left: 10px;
background-image: url(${iconSearch});
background-repeat: no-repeat;
background-size: contain;
width: 25px;
height: 25px;
margin-right:5px;
`;

const SearchInput = () => {
  return (
    <SearchInputBox>
      <SearchSection>
      </SearchSection>
      <Icon />
    </SearchInputBox>
  );
};

export default SearchInput;
