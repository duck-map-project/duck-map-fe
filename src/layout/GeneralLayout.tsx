import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import ArtistModal from '../components/modals/ArtistModal';
import ArtistSelectModal from '../components/modals/ArtistSelectModal';
import ArtistTypeModal from '../components/modals/ArtistTypeModal';
import BookmarkFolderModal from '../components/modals/BookmarkFolderModal';
import CategoryModal from '../components/modals/CategoryModal';
import CategorySelectModal from '../components/modals/CategorySelectModal';
import EventArtistModal from '../components/modals/EventArtistModal';
import GroupModal from '../components/modals/GroupModal';
import {
  selectCategoryModalState,
  selectEditCategoryModalState,
  selectGroupModalState,
  selectArtistTypeModalState,
  selectEditArtistTypeModalState,
  selectArtistModalState,
  selectEditArtistModalState,
  selectAddBookmarkFolderModalState,
  selectEditBookmarkFolderModalState,
  selectEventArtistModalState,
  selectEventCategoryModalState,
  selectEditGroupModalState,
  selectEventListArtistModalState,
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
  const artistTypeEditModalState = useSelector(selectEditArtistTypeModalState);
  const categoryModalState = useSelector(selectCategoryModalState);
  const categroyEditModalState = useSelector(selectEditCategoryModalState);
  const bookmarkAddFolderModalState = useSelector(
    selectAddBookmarkFolderModalState
  );
  const bookmarkEditFolderModalState = useSelector(
    selectEditBookmarkFolderModalState
  );
  const eventArtistModalState = useSelector(selectEventArtistModalState);
  const eventCategoryModalState = useSelector(selectEventCategoryModalState);
  const eventListModalState = useSelector(selectEventListArtistModalState);

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <GroupModal type="add" />}
      {groupEditModalState && <GroupModal type="edit" />}
      {artistModalState && <ArtistModal type="add" />}
      {artistEditModalState && <ArtistModal type="edit" />}
      {artistTypeModalState && <ArtistTypeModal type="add" />}
      {artistTypeEditModalState && <ArtistTypeModal type="edit" />}
      {categoryModalState && <CategoryModal type="add" />}
      {categroyEditModalState && <CategoryModal type="edit" />}
      {bookmarkAddFolderModalState && <BookmarkFolderModal type="add" />}
      {bookmarkEditFolderModalState && <BookmarkFolderModal type="edit" />}
      {eventArtistModalState && <ArtistSelectModal />}
      {eventCategoryModalState && <CategorySelectModal />}
      {eventListModalState && <EventArtistModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
