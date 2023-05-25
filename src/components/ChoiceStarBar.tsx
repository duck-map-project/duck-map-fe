import { styled } from 'styled-components';

import logoIcon from '../assets/logo-icon.png';

const Bar = styled.section`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  background-color: var(--light-purple);
  border-radius: 10px;
  padding-left: 22px;
`;

const OpenModalButton = styled.button`
  width: 80px;
  height: 80px;
  border: 3px solid var(--purple);
  border-radius: 50%;
  background-color: var(--white);
  background-image: url(${logoIcon});
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-right: 53px;
  flex-shrink: 0;
  &::after {
    content: '';
    display: block;
    width: 3px;
    height: 90px;
    background-color: var(--purple);
    position: absolute;
    right: -28px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StarList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const StarItem = styled.li`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--blue);
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const ChoiceStarBar = () => {
  return (
    <Bar>
      <OpenModalButton type="button" />
      <StarList>
        <StarItem />
        <StarItem />
        <StarItem />
        <StarItem />
        <StarItem />
      </StarList>
    </Bar>
  );
};

export default ChoiceStarBar;
