import { useSelector } from 'react-redux';

import useModal from '../../hooks/useModal';

import { selectModalsSlice } from './modalsSlice';

const ReduxModalRoot = () => {
  const modals = useSelector(selectModalsSlice);

  const { closeModal } = useModal();
  return (
    <>
      {modals.map((modal, idx) => {
        const { Component, props } = modal;
        const onCloseHandler = () => {
          closeModal({ Component });
        };

        return <Component key={idx} onClose={onCloseHandler} {...props} />;
      })}
    </>
  );
};

export default ReduxModalRoot;
