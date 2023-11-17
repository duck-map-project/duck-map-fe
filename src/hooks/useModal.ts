import { useDispatch } from 'react-redux';

import { Modals, open, close } from '../features/modal/modalsSlice';

const useModal = () => {
  const dispatch = useDispatch();

  const openModal = ({ Component, props }: Modals) => {
    dispatch(open({ Component, props }));
  };

  const closeModal = ({ Component }: Pick<Modals, 'Component'>) => {
    dispatch(close({ Component }));
  };

  return { openModal, closeModal };
};

export default useModal;
