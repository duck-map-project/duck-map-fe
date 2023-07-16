import styled from 'styled-components';

export const ModalTitle = styled.h4`
  padding: 13px 58px;
  margin: 24px 0 24.5px;
  background-color: #fcf9a4;
  border-radius: 73px;
  border: 2.937px solid var(--line-black);
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 17px;
`;

export const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 70%;
  margin: 10px 0 14px;
`;

export const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

export const ImageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
`;

export const NameLabel = styled.label`
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 10px 20px;
`;

export const CategoryInput = styled.input`
  width: 608px;
  height: 58px;
  padding: 20px;
  margin-bottom: 31px;
  font-size: 20px;
  font-weight: 400;
  background-color: #f8f8fa;
  border: 1.4px solid var(--font-black);
  border-radius: 30px;
  box-shadow: 7px 5px 0px 0px rgb(0, 0, 0, 0.3);
  &::placeholder {
    font-size: 20px;
    color: #8f9196;
  }
`;

export const SubmitButton = styled.button`
  width: 202px;
  font-size: 35px;
  font-weight: 700;
  padding: 16px;
  border: 3px solid var(--line-black);
  border-radius: 73px;
  background-color: #defcf9;
  box-shadow: 6px 4px 0px 0px rgb(0, 0, 0, 0.3);
`;