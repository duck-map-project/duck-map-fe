import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  width?: string;
};

type ModalWidth = {
  width: string;
};

const CommonModal = ({
  className,
  onClick,
  children,
  width = '960',
}: ModalProps) => {
  const preventBubbling = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <Backdrop className={className} onClick={onClick}>
      <ModalOverlay onClick={preventBubbling} width={width}>
        {children}
      </ModalOverlay>
    </Backdrop>
  );
};
export default CommonModal;

export const ModalPortal = ({ children }: ModalProps) => {
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
  width: ${(props) => props.width}px;
  top: 5vh;
  padding: 50px 20px 36px;
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
  }
`;
