import styled from 'styled-components';

type ListLabelProps = {
  selected: boolean;
  heartIcon: string;
};

export const SideBarSection = styled.section`
  position: relative;
  width: 231px;
  min-height: 200px;
  padding: 67px 44px 53px;
  background-color: #fffbe2;
  border: 2px solid var(--line-black);
  border-radius: 20px;
  &::before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 31px;
    top: 0;
    left: 0;
    background-color: #ffd0ec;
    border-bottom: 2px solid var(--line-black);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #f6edb2;
    border: 2px solid var(--line-black);
    border-radius: 20px;
    top: 5px;
    right: -10px;
    z-index: -9;
  }
`;

export const SpringWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 12px;
  top: -13px;
  right: 50%;
  transform: translateX(50%);
`;

export const Spring = styled.div`
  width: 8px;
  height: 24px;
  border: 2px solid var(--line-black);
  border-radius: 6px;
  background-color: #defcf9;
`;

export const ListsWrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

export const List = styled.div`
  margin-bottom: 15px;
`;

export const ListLabel = styled.label<ListLabelProps>`
  position: relative;
  font-size: 24px;
  font-weight: 700;
  color: var(--font-black);
  ${(props) =>
    props.selected &&
    `color: #9859B4;
    &::before {
      position: absolute;
      display: block;
      content: url(${props.heartIcon});
      width: 12px;
      height: 12px;
      top:  -3px;
      left: -20px;
    }
  `}
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 6px;
    opacity: 0.4;
    background-color: #dcd294;
    bottom: 3px;
    left: 5px;
    border-radius: 5px;
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;
