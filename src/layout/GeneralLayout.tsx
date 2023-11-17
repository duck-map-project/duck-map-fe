import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import MobileTab from '../components/MobileTab';
import CategorySelectModal from '../features/categories/modals/CategorySelectModal';
import AddressSearchModal from '../features/events/modals/AddressSearchModal';
import {
  selectEventCategoryModalState,
  selectAddressSearchModalState,
} from '../features/modal/manageModalSlice';
import media from '../utils/mediaQuery';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  ${media.mobile`
    margin-bottom: 80px;
  `}
`;

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);
  const addressSearchModal = useSelector(selectAddressSearchModalState);

  return (
    <PageWrapper>
      <Billboard />
      {eventCategoryModalState && <CategorySelectModal />}
      {addressSearchModal && <AddressSearchModal />}
      <Header />
      {children}
      <MobileTab />
    </PageWrapper>
  );
};

export default GeneralLayout;
