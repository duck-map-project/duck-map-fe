import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import AddArtistModal from '../components/modals/AddArtistModal';
import AddArtistTypeModal from '../components/modals/AddArtistTypeModal';
import AddBookmarkFolderModal from '../components/modals/AddBookmarkFolderModal';
import AddCategoryModal from '../components/modals/AddEventCategoryModal';
import AddGroupModal from '../components/modals/AddGroupModal';
import ArtistSelectModal from '../components/modals/ArtistSelectModal';
import CategorySelectModal from '../components/modals/CategorySelectModal';
import {
  selectCategoryModalState,
  selectGroupModalState,
  selectArtistTypeModalState,
  selectArtistModalState,
  selectBookmarkFolderModalState,
  selectEventArtistModalState,
  selectEventCategoryModalState,
} from '../redux/manageModalSlice';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const groupModalState = useSelector(selectGroupModalState);
  const artistModalState = useSelector(selectArtistModalState);
  const artistTypeModalState = useSelector(selectArtistTypeModalState);
  const categoryModalState = useSelector(selectCategoryModalState);
  const bookmarkFolderModalState = useSelector(selectBookmarkFolderModalState);
  const eventArtistModalState = useSelector(selectEventArtistModalState);
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <AddGroupModal />}
      {artistModalState && <AddArtistModal />}
      {artistTypeModalState && <AddArtistTypeModal />}
      {categoryModalState && <AddCategoryModal />}
      {bookmarkFolderModalState && <AddBookmarkFolderModal />}
      {eventArtistModalState && <ArtistSelectModal />}
      {eventCategoryModalState && <CategorySelectModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
