import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import Billboard from '../components/Billboard';
import Header from '../components/Header';
import AddArtistModal from '../components/modals/AddArtistModal';
import AddGroupModal from '../components/modals/AddGroupModal';
import { selectGroupModalState } from '../redux/manageModalSlice';
import { selectArtistModalState } from '../redux/manageModalSlice';

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

  return (
    <PageWrapper>
      <Billboard />
      {groupModalState && <AddGroupModal />}
      {artistModalState && <AddArtistModal />}
      <Header />
      {children}
    </PageWrapper>
  );
};

export default GeneralLayout;
