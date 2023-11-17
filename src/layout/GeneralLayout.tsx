import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import MobileTab from '../components/MobileTab';
import ArtistModal from '../features/artists/modals/ArtistModal';
import ArtistSelectModal from '../features/artists/modals/ArtistSelectModal';
import ArtistTypeModal from '../features/artists/modals/ArtistTypeModal';
import EventArtistModal from '../features/artists/modals/EventArtistModal';
import CategoryModal from '../features/categories/modals/CategoryModal';
import CategorySelectModal from '../features/categories/modals/CategorySelectModal';
import AddressSearchModal from '../features/events/modals/AddressSearchModal';
import {
  selectCategoryModalState,
  selectEditCategoryModalState,
  selectArtistTypeModalState,
  selectEditArtistTypeModalState,
  selectArtistModalState,
  selectEditArtistModalState,
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
  const artistModalState = useSelector(selectArtistModalState);
  const artistEditModalState = useSelector(selectEditArtistModalState);
  const artistTypeModalState = useSelector(selectArtistTypeModalState);
  const artistTypeEditModalState = useSelector(selectEditArtistTypeModalState);
  const categoryModalState = useSelector(selectCategoryModalState);
  const categroyEditModalState = useSelector(selectEditCategoryModalState);
  const eventArtistModalState = useSelector(selectEventArtistModalState);
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);
  const eventListArtistModal = useSelector(selectEventListArtistModalState);
  const addressSearchModal = useSelector(selectAddressSearchModalState);

  return (
    <PageWrapper>
      <Billboard />
      {artistModalState && <ArtistModal type="add" />}
      {artistEditModalState && <ArtistModal type="edit" />}
      {artistTypeModalState && <ArtistTypeModal type="add" />}
      {artistTypeEditModalState && <ArtistTypeModal type="edit" />}
      {categoryModalState && <CategoryModal type="add" />}
      {categroyEditModalState && <CategoryModal type="edit" />}
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
