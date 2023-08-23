import styled from 'styled-components';

import media from '../../../utils/mediaQuery';

export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  ${media.mobile`
    margin-top: 110px;
    margin-bottom: 20px;
  `}
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 458px;
  margin-bottom: 22px;
  ${media.mobile`
    width: 100%;
    padding-left: 10px;
  `}
`;

export const StyledLabel = styled.label`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  ${media.mobile`
  width: 45%;
    font-size: 16px;
  `}
`;

export const StyledInput = styled.input`
  display: block;
  width: 308px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  border-radius: 20px;
  ${media.mobile`
    width: 90%;
  `}
`;

export const PasswordInput = styled(StyledInput)`
  border: 2px solid var(--line-black);
  background-color: #f8f8fa;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
`;

export const EditSubmitBtn = styled.button`
  width: 474px;
  margin-top: 201px;
  padding: 17px;
  color: var(--font-black);
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  border: 2px solid var(--line-black);
  border-radius: 50px;
  background-color: #defcf9;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  ${media.mobile`
    width: 50%;
  padding: 8px;
  `}
`;
