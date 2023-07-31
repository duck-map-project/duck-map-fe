import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import AddArtistTypeModal from '../components/modals/AddArtistTypeModal';
import AddCategoryModal from '../components/modals/AddEventCategoryModal';
import ArtistModal from '../components/modals/ArtistModal';
import ArtistSelectModal from '../components/modals/ArtistSelectModal';
import BookmarkFolderModal from '../components/modals/BookmarkFolderModal';
import CategorySelectModal from '../components/modals/CategorySelectModal';
import GroupModal from '../components/modals/GroupModal';
import {
  selectCategoryModalState,
  selectGroupModalState,
  selectArtistTypeModalState,
  selectArtistModalState,
  selectEditArtistModalState,
  selectAddBookmarkFolderModalState,
  selectEditBookmarkFolderModalState,
  selectEventArtistModalState,
  selectEventCategoryModalState,
  selectEditGroupModalState,
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
  const groupEditModalState = useSelector(selectEditGroupModalState);
  const artistModalState = useSelector(selectArtistModalState);
  const artistEditModalState = useSelector(selectEditArtistModalState);
  const artistTypeModalState = useSelector(selectArtistTypeModalState);
  const categoryModalState = useSelector(selectCategoryModalState);
  const bookmarkAddFolderModalState = useSelector(
    selectAddBookmarkFolderModalState
  );
  const bookmarkEditFolderModalState = useSelector(
    selectEditBookmarkFolderModalState
  );
  const eventArtistModalState = useSelector(selectEventArtistModalState);
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <GroupModal type="add" />}
      {groupEditModalState && <GroupModal type="edit" />}
      {artistModalState && <ArtistModal type="add" />}
      {artistEditModalState && <ArtistModal type="edit" />}
      {artistTypeModalState && <AddArtistTypeModal />}
      {categoryModalState && <AddCategoryModal />}
      {bookmarkAddFolderModalState && <BookmarkFolderModal type="add" />}
      {bookmarkEditFolderModalState && <BookmarkFolderModal type="edit" />}
      {eventArtistModalState && <ArtistSelectModal />}
      {eventCategoryModalState && <CategorySelectModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
