import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import MobileTab from '../components/MobileTab';
import ArtistSelectModal from '../features/artists/modals/ArtistSelectModal';
import EventArtistModal from '../features/artists/modals/EventArtistModal';
import CategorySelectModal from '../features/categories/modals/CategorySelectModal';
import AddressSearchModal from '../features/events/modals/AddressSearchModal';
import {
  selectEventArtistModalState,
  selectEventCategoryModalState,
  selectEventListArtistModalState,
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
  const eventArtistModalState = useSelector(selectEventArtistModalState);
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);
  const eventListArtistModal = useSelector(selectEventListArtistModalState);
  const addressSearchModal = useSelector(selectAddressSearchModalState);

  return (
    <PageWrapper>
      <Billboard />
      {eventArtistModalState && <ArtistSelectModal />}
      {eventCategoryModalState && <CategorySelectModal />}
      {eventListArtistModal && <EventArtistModal />}
      {addressSearchModal && <AddressSearchModal />}
      <Header />
      {children}
      <MobileTab />
    </PageWrapper>
  );
};

export default GeneralLayout;
