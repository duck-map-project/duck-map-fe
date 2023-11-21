import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

import media from '../../utils/mediaQuery';

type commonModalProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  width?: string;
};

type ModalWidth = {
  width: string | undefined;
};

const CommonModal = ({
  className,
  onClick,
  children,
  width,
}: commonModalProps) => {
  const preventBubbling = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ModalPortal>
      <Backdrop className={className} onClick={onClick}>
        <ModalOverlay
          onClick={preventBubbling}
          onSubmit={preventSubmit}
          width={width}
        >
          <ModalContent>{children}</ModalContent>
        </ModalOverlay>
      </Backdrop>
    </ModalPortal>
  );
};
export default CommonModal;

const ModalPortal = ({ children }: commonModalProps) => {
  const portalElement = document.getElementById('modal')!;
  return ReactDom.createPortal(children, portalElement);
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalOverlay = styled.form<ModalWidth>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.width
      ? `
      width: ${props.width}px;
      `
      : `
      width: 80%;
      max-width: 960px;
    `}
  max-height: 90vh;
  top: 5vh;
  padding: 50px 20px 0px;
  margin: 0 auto;
  border: 3px solid var(--line-black);
  border-radius: 29px;
  background-color: #fffbe2;
  box-sizing: border-box;
  z-index: 1000;
  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 3px solid var(--line-black);
    border-top-right-radius: 29px;
    border-top-left-radius: 29px;
    background-color: #ffd0ec;
    box-sizing: border-box;
    ${media.mobile`
      height: 40px;
    `}
  }
  ${media.mobile`
    width: 90%;
    padding-top: 40px;
    max-height: 80vh;
    top: 10vh;
  `}
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  padding-bottom: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
