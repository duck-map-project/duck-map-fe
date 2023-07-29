import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import AddArtistModal from '../components/modals/AddArtistModal';
import AddArtistTypeModal from '../components/modals/AddArtistTypeModal';
import AddBookmarkFolderModal from '../components/modals/AddBookmarkFolderModal';
import AddCategoryModal from '../components/modals/AddEventCategoryModal';
import AddGroupModal from '../components/modals/AddGroupModal';
import {
  selectCategoryModalState,
  selectGroupModalState,
  selectArtistTypeModalState,
  selectArtistModalState,
  selectBookmarkFolderModalState,
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

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <AddGroupModal />}
      {artistModalState && <AddArtistModal />}
      {artistTypeModalState && <AddArtistTypeModal />}
      {categoryModalState && <AddCategoryModal />}
      {bookmarkFolderModalState && <AddBookmarkFolderModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
